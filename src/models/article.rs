use chrono::{DateTime, Utc};
use config::DATE_FORMAT;
use models::user::User;

#[derive(Queryable)]
pub struct Article {
  pub id: i32,
  pub slug: String,
  pub title: String,
  pub description: String,
  pub body: String,
  pub author: i32,
  pub tag_list: Vec<String>,
  pub created_at: DateTime<Utc>,
  pub updated_at: DateTime<Utc>,
  pub favorites_count: i32,
}
