use diesel;
use diesel::prelude::*;
use diesel::pg::PgConnection;
use crypto::scrypt::{scrypt_check, scrypt_simple, ScryptParams};
use validator::Validate;
use errors::WebError;
use models::user::User;
use schema::{follows, users};

pub fn find_one(conn: &PgConnection, id: i32) -> Result<User, WebError> {
  Ok(users::table.find(id).get_result::<User>(conn)?)
}

pub fn find_all(conn: &PgConnection, offset: i64, limit: i64) -> Result<Vec<User>, WebError> {
  Ok(users::table.offset(offset).limit(limit).load::<User>(conn)?)
}

#[derive(Clone, Insertable, GraphQLInputObject, Validate)]
#[table_name = "users"]
pub struct CreateUserData {
  #[validate(length(min = "3"))]
  pub username: String,
  #[validate(email)]
  pub email: String,
  #[validate(length(min = "6"))]
  pub hash: String,
}

pub fn create(conn: &PgConnection, data: CreateUserData) -> Result<User, WebError> {
  data.validate()?;
  let n: i64 = users::table
    .filter(users::username.eq(&data.username))
    .count()
    .get_result(conn)?;
  if n > 0 {
    return Err(WebError::Validation("username has already been taken"));
  }
  let data = &CreateUserData {
    hash: scrypt_simple(&data.hash, &ScryptParams::new(14, 8, 1)).expect("hash error"),
    ..data.clone()
  };
  Ok(diesel::insert_into(users::table)
    .values(data)
    .get_result(conn)?)
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

pub fn login<'a>(conn: &PgConnection, email: String, password: String) -> Result<User, WebError> {
  let user = users::table
    .filter(users::email.eq(email))
    .get_result::<User>(conn)?;

  match scrypt_check(&password, &user.hash).unwrap() {
      true => Ok(user),
      false => Err(WebError::Validation("invalid credentials")),
  }
}

pub fn is_following(conn: &PgConnection, user_id: i32, other_user_id: i32) -> Result<bool, WebError> {
    use diesel::select;
    use diesel::dsl::exists;

    Ok(select(exists(follows::table.find((user_id, other_user_id)))).get_result(conn)?)
}

pub fn follow(conn: &PgConnection, followed_name: &str, follower_id: i32) -> Result<User, WebError> {
    let followed = users::table
        .filter(users::username.eq(followed_name))
        .get_result::<User>(conn)?;

    diesel::insert_into(follows::table)
        .values((
            follows::follower.eq(followed.id),
            follows::followed.eq(follower_id),
        ))
        .execute(conn)?;
    Ok(followed)
}

pub fn unfollow(conn: &PgConnection, followed_name: &str, follower_id: i32) -> Result<User, WebError> {
    let followed = users::table
        .filter(users::username.eq(followed_name))
        .get_result::<User>(conn)?;

    diesel::delete(follows::table.find((followed.id, follower_id))).execute(conn)?;

    Ok(followed)
}
