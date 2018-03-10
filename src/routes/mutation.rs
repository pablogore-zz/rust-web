use juniper::FieldResult;
use super::context::Context;
use models::user::User;
use db;

pub struct MutationRoot;

graphql_object!(MutationRoot: Context |&self| {

  field userCreate(&executor, input: db::users::CreateUserData) -> FieldResult<User> {
    Ok(db::users::create(&*executor.context().conn, input)?)
  }
  

  field userUpdate(&executor, input: db::users::UpdateUserData) -> FieldResult<User> {
     Ok(db::users::update(&*executor.context().conn, input)?)
  }
});
