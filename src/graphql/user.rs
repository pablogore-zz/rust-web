use juniper::FieldResult;
use utils::context::Context;
use models::user::User;

graphql_object!(User: Context |&self| {
  field id() -> i32 {
    self.id
  }

  field phone() -> &str {
    &self.phone
  }

  field is_following(&executor) -> FieldResult<bool> {
    Ok(User::is_following(&*executor.context().conn, self.id, self.id)?)
  }
});
