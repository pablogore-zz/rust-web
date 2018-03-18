use diesel::pg::PgConnection;
use validator::Validate;
use errors::WebError;
use models::user::User;
use db;
use utils::auth;

#[derive(Clone, GraphQLInputObject, Validate)]
pub struct SignUpParams {
  email: String,
  password: String,
}

pub struct SignUpResponse {
  user: User,
  token: String,
}

// #[derive(Clone, Insertable, GraphQLInputObject, Validate)]
// #[table_name = "users"]
// pub struct CreateUserData {
//   #[validate(length(min = "3"))]
//   pub username: String,
//   #[validate(email)]
//   pub email: String,
//   #[validate(length(min = "6"))]
//   pub hash: String,
// }

// pub fn sign_up(conn: &PgConnection, params: SignUpParams) ->
// Result<SignUpResponse, WebError> {   params.validate()?;
//   let exists = db::users::exists_by_email(conn, params.email)?;
//   if exists {
//     return Err(WebError::Validation("email has already been taken"));
//   }
//   let user = db::users::create(conn, db::users::NewUser{
//     email: params.email,
//     password: params.password,
//   })?;
//   let token = auth::create_token(user.id);
//   Ok(SignUpResponse{
//     user: user,
//     token: token,
//   })
// }

#[derive(Clone, GraphQLInputObject, Validate)]
pub struct LoginParams {
  email: String,
  password: String,
}

pub struct LoginResponse {
  user: User,
  token: String,
}

use graphql::context::Context;

graphql_object!(LoginResponse: Context | &self | {});

// #[validate]
// #[exists]
pub fn login(conn: &PgConnection, params: LoginParams) -> Result<LoginResponse, WebError> {
  params.validate()?;
  let user = db::users::find_one_by_email(conn, params.email)?;
  auth::check_password(&params.password, &user.password)?;
  let token = auth::create_token(user.id);
  Ok(LoginResponse {
    user: user,
    token: token,
  })
}
