#[derive(Queryable, Clone, Serialize, Deserialize)]
pub struct User {
  pub id: i32,
  pub email: String,
  pub password: String,
}
