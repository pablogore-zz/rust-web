use juniper::FieldResult;
use super::context::Context;
use commands::user;

pub struct MutationRoot;

graphql_object!(MutationRoot: Context |&self| {

  field signup(&executor, params: user::SignUpParams) -> FieldResult<bool> {
    Ok(user::sign_up(&*executor.context().conn, params)?)
  }

  field login(&executor, params: user::LoginParams) -> FieldResult<bool> {
    Ok(user::login(&*executor.context().conn, params)?)
  }

  field verify(&executor, params: user::VerifyParams) -> FieldResult<user::VerifyResponse> {
    Ok(user::verify(&*executor.context().conn, params)?)
  }

  field retryOtp(&executor, params: user::RetryParams) -> FieldResult<bool>  {
    Ok(user::retry_otp(&*executor.context().conn, params)?)
  }

  // field userUpdate(&executor, input: db::users::UpdateUserData) -> FieldResult<User> {
  //    Ok(db::users::update(&*executor.context().conn, input)?)
  // }

});
