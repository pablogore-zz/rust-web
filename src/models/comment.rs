use chrono::{DateTime, Utc};
use config::DATE_FORMAT;
use models::user::User;

#[derive(Queryable)]
pub struct Comment {
  pub id: i32,
  pub body: String,
  pub article: i32,
  pub author: i32,
  pub created_at: DateTime<Utc>,
  pub updated_at: DateTime<Utc>,
}
