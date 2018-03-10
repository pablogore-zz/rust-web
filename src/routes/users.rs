use auth::Auth;
use validator::{Validate, ValidationError, ValidationErrors};
use rocket_contrib::{Json, Value};
use db;
use errors::Errors;
use util::extract_string;
use diesel::*;

// #[derive(Deserialize)]
// struct LoginUser {
//     user: LoginUserData,
// }

// #[derive(Deserialize)]
// struct LoginUserData {
//     email: Option<String>,
//     password: Option<String>,
// }

// #[post("/users/login", format = "application/json", data = "<user>")]
// fn post_users_login(user: Json<LoginUser>, conn: db::Conn) -> Result<Json<Value>, Errors> {
//     let mut errors = Errors::new();
//     let email = extract_string(&user.user.email, "email", &mut errors);
//     let password = extract_string(&user.user.password, "password", &mut errors);
//     match db::users::login(&conn, &email, &password) {
//         Some(user) => Ok(Json(json!({ "user": user.to_user_auth() }))),
//         None => {
//             errors.add("email or password", ValidationError::new("is invalid"));
//             Err(errors)
//         }
//     }
// }

// #[get("/user")]
// fn get_user(auth: Auth, conn: db::Conn) -> Option<Json<Value>> {
//     db::users::find(&conn, auth.id).map(|user| Json(json!({ "user": user.to_user_auth() })))
// }

// #[derive(Deserialize)]
// struct UpdateUser {
//     user: db::users::UpdateUserData,
// }

// #[put("/user", format = "application/json", data = "<user>")]
// fn put_user(user: Json<UpdateUser>, auth: Auth, conn: db::Conn) -> Option<Json<Value>> {
//     db::users::update(&conn, auth.id, &user.user)
//         .map(|user| Json(json!({ "user": user.to_user_auth() })))
// }
