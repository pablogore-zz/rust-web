use rocket::response::status;
use rocket::request::Request;
use rocket::http::Status;
use rocket::response::{self, Responder};
use rocket_contrib::Json;
use validator::ValidationErrors;
use std::ops::{Deref, DerefMut};
use std::collections::HashMap;
use std::error::Error;
use validator::ValidationError;

#[derive(Debug, Serialize)]
pub struct Errors {
  pub errors: ValidationErrors,
}

impl<'r> Responder<'r> for Errors {
  fn respond_to(self, req: &Request) -> response::Result<'r> {
    // TODO: get rid of allocations
    let mut errors = HashMap::new();
    for (field, ers) in self.errors.inner() {
      errors.insert(
        field,
        ers
          .into_iter()
          .map(|err| err.description().to_owned())
          .collect::<Vec<_>>(),
      );
    }
    status::Custom(
      Status::UnprocessableEntity,
      Json(json!({ "errors": errors })),
    ).respond_to(req)
  }
}

impl Errors {
  #[allow(dead_code)]
  pub fn new() -> Errors {
    Errors {
      errors: ValidationErrors::new(),
    }
  }
}

impl Deref for Errors {
  type Target = ValidationErrors;

  fn deref(&self) -> &ValidationErrors {
    &self.errors
  }
}

impl DerefMut for Errors {
  fn deref_mut(&mut self) -> &mut ValidationErrors {
    &mut self.errors
  }
}

use juniper;
use diesel;
use validator;

quick_error! {
    #[derive(Debug)]
    pub enum WebError {
        Diesel(err: diesel::result::Error) {
            from()
            description("Diesel error")
            display("Diesel error: {}", err)
            cause(err)
        }
        Juniper(err: juniper::FieldError) {
            from()
            description("juniper error")
            display("Junper error: {:?}", err)
        }
        ValidationError(err: validator::ValidationError) {
            from()
            description("validator error")
            display("Validator error: {:?}", err) // this needs to be changed
        }
        ValidationErrors(err: validator::ValidationErrors) {
            from()
            description("validator errors")
            display("Validator errors: {:?}", err) // this needs to be changed
        }
        Validation(desc: &'static str) {
            from()
            description(desc)
            display("Error {}", desc)
        }
    }
}
