use std::env;
use std::env::VarError;

/// js toISOString() in test suit can't handle chrono's default precision
pub const DATE_FORMAT: &'static str = "%Y-%m-%dT%H:%M:%S%.3fZ";
pub const SECRET: &'static str = "secret123";
pub const MSG_91_API_ENDPOINT: &'static str = "http://control.msg91.com/api";
pub const MSG_91_SENDER_SMS_ID: &'static str = "PYROS2097";
pub const MSG_91_AUTHKEY: &'static str = "204909AVZ2jjKHhlz5ab20d25";

pub fn database_url() -> String {
  match env::var("DATABASE_URL") {
    Ok(val) => val,
    Err(e) => {
      if e == VarError::NotPresent {
        "postgres://postgres:postgres@localhost:5432/postgres".to_owned()
      } else {
        panic!(e);
      }
    }
  }
}
