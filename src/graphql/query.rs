use juniper::FieldResult;
use utils::context::Context;
use models::user::User;

pub struct QueryRoot;

graphql_object!(QueryRoot: Context |&self| {
    field user(&executor) -> FieldResult<&Option<User>> {
      Ok(&executor.context().user)
    }

    field users(&executor, offset: i32, limit: i32) -> FieldResult<Vec<User>> {
      Ok(User::find_all(&executor.context().conn, offset as i64, limit as i64)?)
    }
});
