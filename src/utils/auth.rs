use std::ops::Deref;
use jwt;
use chrono::{Duration, Utc};
use config::SECRET;
use crypto::scrypt::{scrypt_check, scrypt_simple, ScryptParams};
use errors::WebError;
use rocket::Outcome;
use rocket::request::{self, FromRequest, Request};
use serde_json;

#[derive(Debug, Deserialize, Serialize)]
pub struct Token {
  pub exp: i64,
  pub user_id: i32,
}

#[allow(dead_code)]
pub fn create_hash(password: String) -> String {
  scrypt_simple(&password, &ScryptParams::new(14, 8, 1)).expect("hash error")
}

#[allow(dead_code)]
pub fn check_password(password: &String, hash: &String) -> Result<bool, WebError> {
  match scrypt_check(&password, &hash).unwrap() {
    true => Ok(true),
    false => Err(WebError::ValidationMessage("invalid credentials")),
  }
}

pub fn create_token(user_id: i32) -> Result<String, jwt::Error> {
  let exp = Utc::now() + Duration::days(180);
  let header = json!({});
  let payload = json!(Token {
    user_id: user_id,
    exp: exp.timestamp(),
  });
  jwt::encode(header, &SECRET.to_string(), &payload, jwt::Algorithm::HS256)
}

pub struct ReqToken(pub Option<Token>);

impl Deref for ReqToken {
  type Target = Option<Token>;

  #[inline(always)]
  fn deref(&self) -> &Self::Target {
    &self.0
  }
}

impl<'a, 'r> FromRequest<'a, 'r> for ReqToken {
  type Error = ();

  fn from_request(request: &'a Request<'r>) -> request::Outcome<ReqToken, ()> {
    if let Some(auth) = extract_auth_from_request(request) {
      Outcome::Success(ReqToken(Some(auth)))
    } else {
      Outcome::Success(ReqToken(None))
    }
  }
}

fn extract_auth_from_request(request: &Request) -> Option<Token> {
  let header = request.headers().get("authorization").next();
  if let Some(token) = header {
    match jwt::decode(
      &token.to_string(),
      &SECRET.to_string(),
      jwt::Algorithm::HS256,
    ) {
      Err(err) => {
        error!("Auth decode error: {:?}", err);
      }
      Ok((_, payload)) => match serde_json::from_value::<Token>(payload) {
        Ok(auth) => return Some(auth),
        Err(err) => error!("Auth serde decode error: {:?}", err),
      },
    };
  }
  None
}
