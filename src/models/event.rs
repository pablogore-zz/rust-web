use chrono::{DateTime, Utc};

#[derive(Serialize)]
pub enum EventData {
  UserLoginData {
    email: String
  }
  UserSignUpDate {
    name: String
    email: String
  }
}

#[derive(Queryable, Serialize)]
pub struct Event {
  pub id: i32
  pub type: String
  pub data: EventData,
  pub timetamp: DateTime<Utc>
}
