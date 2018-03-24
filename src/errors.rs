use juniper;
use diesel;
use validator;
use reqwest;

quick_error! {
    #[derive(Debug)]
    pub enum WebError {
        Reqwest(err: reqwest::Error) {
            from()
            description("Reqwest error")
            display("Reqwest error: {}", err)
            cause(err)
        }
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
        ValidationMessage(desc: &'static str) {
            from()
            description(desc)
            display("{}", desc)
        }
        Validation(desc: String) {
            from()
            description(desc)
            display("{}", desc)
        }
    }
}
