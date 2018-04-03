use diesel::pg::PgConnection;
use validator::Validate;
use errors::WebError;
use models::user::{NewUser, UpdateUser, User};
use utils::auth;
use utils::context::Context;
use services::sms;

#[derive(Clone, GraphQLInputObject, Validate)]
pub struct SignUpParams {
  #[validate(length(min = "10", max = "15"))]
  pub phone: String,
}

pub fn sign_up(conn: &PgConnection, params: SignUpParams) -> Result<bool, WebError> {
  params.validate()?;
  let exists = User::exists_by_phone(conn, &params.phone)?;
  if exists {
    return Err(WebError::ValidationMessage(
      "Phone number has already been taken",
    ));
  }
  let user = User::create(
    conn,
    NewUser {
      phone: &params.phone,
    },
  )?;
  sms::send_otp(&user.phone)?;
  Ok(true)
}

#[derive(Clone, GraphQLInputObject, Validate)]
pub struct LoginParams {
  #[validate(length(min = "10", max = "15"))]
  phone: String,
}

// #[validate]
// #[exists]
pub fn login(conn: &PgConnection, params: LoginParams) -> Result<bool, WebError> {
  params.validate()?;
  let exists = User::exists_by_phone(conn, &params.phone)?;
  if !exists {
    User::create(
      conn,
      NewUser {
        phone: &params.phone,
      },
    )?;
  }
  sms::send_otp(&params.phone)?;
  Ok(true)
}

#[derive(Clone, GraphQLInputObject, Validate)]
pub struct VerifyParams {
  phone: String,
  otp: String,
}

pub struct VerifyResponse {
  user: User,
  token: String,
}

graphql_object!(VerifyResponse: Context | &self | {
  field user() -> &User {
     &self.user
  }

  field token() -> &str {
    &self.token
  }
});

pub fn verify(conn: &PgConnection, params: VerifyParams) -> Result<VerifyResponse, WebError> {
  params.validate()?;
  let user = User::find_one_by_phone(conn, &params.phone)?;
  sms::verify_otp(&params.phone, &params.otp)?;
  let token = auth::create_token(user.id)?;
  Ok(VerifyResponse {
    user: user,
    token: token,
  })
}

#[derive(Clone, GraphQLInputObject, Validate)]
pub struct RetryParams {
  phone: String,
}

pub fn retry_otp(conn: &PgConnection, params: RetryParams) -> Result<bool, WebError> {
  params.validate()?;
  let user = User::find_one_by_phone(conn, &params.phone)?;
  sms::retry_otp(&user.phone)?;
  Ok(true)
}
