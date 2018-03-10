use schema::users;
use diesel;
use diesel::prelude::*;
use diesel::pg::PgConnection;
use crypto::scrypt::{scrypt_check, scrypt_simple, ScryptParams};
use validator::{Validate, ValidationErrors};
use errors::WebError;
use models::user::User;

#[derive(Insertable, GraphQLInputObject, Validate)]
#[table_name = "users"]
pub struct CreateUserData {
    #[validate(length(min = "1"))]
    pub username: String,
    #[validate(email)]
    pub email: String,
    #[validate(length(min = "8"))]
    pub hash: String,
}

pub fn create(conn: &PgConnection, new_user: CreateUserData) -> Result<User, WebError> {
    // new_user.validate()?;

    let n: i64 = users::table.filter(users::username.eq(&new_user.username)).count().get_result(conn)?;
    if n > 0 {
      return Err(WebError::Validation("username has already been taken"));
    }

    // new_user.hash = &scrypt_simple(new_user.hash, &ScryptParams::new(14, 8, 1)).expect("hash error");
    Ok(diesel::insert_into(users::table)
        .values(&new_user)
        .get_result(conn)?)
}

pub fn login<'a>(conn: &PgConnection, email: &'a str, password: &'a str) -> Option<User> {
    let result = users::table
        .filter(users::email.eq(email))
        .get_result::<User>(conn);

    // TODO: get rid of pyramid
    match result {
        Err(err) => {
            println!("login_user: {}", err);
            None
        }
        Ok(user) => match scrypt_check(password, &user.hash) {
            Ok(valid) => {
                if valid {
                    Some(user)
                } else {
                    None
                }
            }
            Err(err) => {
                println!("login_user scrypt_check: {}", err);
                None
            }
        },
    }
}

pub fn find(conn: &PgConnection, id: i32) -> Option<User> {
    let result = users::table.find(id).get_result::<User>(conn);
    match result {
        Err(err) => {
            println!("find_user: {}", err);
            None
        }
        Ok(user) => Some(user),
    }
}

pub fn findAll(conn: &PgConnection, offset: i64, limit: i64) -> Result<Vec<User>, WebError> {
    Ok(users::table.offset(offset).limit(limit).load::<User>(conn)?)
}

// TODO: remove clone when diesel will allow skipping fields
#[derive(Deserialize, AsChangeset, Default, Clone, GraphQLInputObject, Validate)]
#[table_name = "users"]
pub struct UpdateUserData {
    id: i32,
    username: Option<String>,
    email: Option<String>,
    bio: Option<String>,
    image: Option<String>,

    // hack to skip the field
    #[column_name = "hash"]
    password: Option<String>,
}

pub fn update(conn: &PgConnection, data: UpdateUserData) -> Result<User, WebError> {
    let data = &UpdateUserData {
        password: None,
        ..data.clone()
    };
    Ok(diesel::update(users::table.find(&data.id))
        .set(data)
        .get_result(conn)?)
}
