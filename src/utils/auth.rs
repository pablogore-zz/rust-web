// use rocket::Outcome;
// use rocket::request::{self, FromRequest, Request};

// impl<'a, 'r> FromRequest<'a, 'r> for Auth {
//   type Error = ();

//   fn from_request(request: &'a Request<'r>) -> request::Outcome<Auth, ()> {
//     if let Some(auth) = extract_auth_from_request(request) {
//       Outcome::Success(auth)
//     } else {
//       Outcome::Forward(())
//     }
//   }
// }

// fn extract_auth_from_request(request: &Request) -> Option<Auth> {
//   let header = request.headers().get("authorization").next();
//   if let Some(token) = header.and_then(extract_token_from_header) {
//     match jwt::decode(
//       &token.to_string(),
//       &SECRET.to_string(),
//       jwt::Algorithm::HS256,
//     ) {
//       Err(err) => {
//         println!("Auth decode error: {:?}", err);
//       }
//       Ok((_, payload)) => match serde_json::from_value::<Auth>(payload) {
//         Ok(auth) => return Some(auth),
//         Err(err) => println!("Auth serde decode error: {:?}", err),
//       },
//     };
//   }
//   None
// }

// fn extract_token_from_header(header: &str) -> Option<&str> {
//   if header.starts_with(TOKEN_PREFIX) {
//     Some(&header[TOKEN_PREFIX.len()..])
//   } else {
//     None
//   }
// }


use jwt;
use serde_json;
use chrono::{Duration, Utc};
use config::{SECRET, TOKEN_PREFIX};
use crypto::scrypt::{scrypt_check, scrypt_simple, ScryptParams};
use errors::WebError;

#[derive(Debug, Deserialize, Serialize)]
pub struct Token {
  pub exp: i64,
  pub user_id: i32,
}

pub fn create_hash(password: String) -> String {
  scrypt_simple(&password, &ScryptParams::new(14, 8, 1)).expect("hash error")
}

pub fn check_password(password: &String, hash: &String) -> Result<bool, WebError> {
  match scrypt_check(&password, &hash).unwrap() {
    true => Ok(true),
    false => Err(WebError::Validation("invalid credentials")),
  }
}

pub fn create_token(user_id: i32) -> String {
  let exp = Utc::now() + Duration::days(60);
  let header = json!({});
  let payload = json!(Token {
    user_id: user_id,
    exp: exp.timestamp(),
  });
  jwt::encode(header, &SECRET.to_string(), &payload, jwt::Algorithm::HS256).expect("jwt")
}
