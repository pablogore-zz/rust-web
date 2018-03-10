use juniper::FieldResult;
use super::context::Context;
use models::user::User;
use db;

pub struct QueryRoot;

graphql_object!(QueryRoot: Context |&self| {
    field users(&executor, offset: i32, limit: i32) -> FieldResult<Vec<User>> {
      Ok(db::users::findAll(&executor.context().conn, offset as i64, limit as i64)?)
    }
});
