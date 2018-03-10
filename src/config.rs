use std::env;
use std::env::VarError;

/// js toISOString() in test suit can't handle chrono's default precision
pub const DATE_FORMAT: &'static str = "%Y-%m-%dT%H:%M:%S%.3fZ";
pub const SECRET: &'static str = "secret123";
pub const TOKEN_PREFIX: &'static str = "Token ";

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
