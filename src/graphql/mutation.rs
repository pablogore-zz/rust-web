use juniper::FieldResult;
use super::context::Context;
use commands::user;
use models;

pub struct MutationRoot;

graphql_object!(MutationRoot: Context |&self| {

  field userLogin(&executor, params: user::LoginParams) -> FieldResult<user::LoginResponse> {
    Ok(user::login(&*executor.context().conn, params)?)
  }

  // field userCreate(&executor, input: db::users::CreateUserData) -> FieldResult<User> {
  //   Ok(db::users::create(&*executor.context().conn, input)?)
  // }

  // field userUpdate(&executor, input: db::users::UpdateUserData) -> FieldResult<User> {
  //    Ok(db::users::update(&*executor.context().conn, input)?)
  // }

});
