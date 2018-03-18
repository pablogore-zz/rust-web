use diesel;
use diesel::prelude::*;
use diesel::pg::PgConnection;
use errors::WebError;
use models::user::User;
use schema::{follows, users};

pub fn find_one(conn: &PgConnection, id: i32) -> Result<User, WebError> {
  Ok(users::table.find(id).get_result::<User>(conn)?)
}

pub fn find_one_by_email(conn: &PgConnection, email: String) -> Result<User, WebError> {
  Ok(users::table
    .filter(users::email.eq(email))
    .get_result::<User>(conn)?)
}

pub fn exists_by_email(conn: &PgConnection, email: String) -> Result<bool, WebError> {
  let n: i64 = users::table
    .filter(users::email.eq(email))
    .count()
    .get_result(conn)?;
  Ok(n != 0)
}

pub fn find_all(conn: &PgConnection, offset: i64, limit: i64) -> Result<Vec<User>, WebError> {
  Ok(users::table.offset(offset).limit(limit).load::<User>(conn)?)
}

#[derive(Clone, Insertable)]
#[table_name = "users"]
pub struct NewUser {
  email: String,
  password: String
}

pub fn create(conn: &PgConnection, data: NewUser) -> Result<User, WebError> {
   Ok(diesel::insert_into(users::table)
    .values(&data)
    .get_result(conn)?)
}

// TODO: remove clone when diesel will allow skipping fields
#[derive(Deserialize, AsChangeset, Default, Clone)]
#[table_name = "users"]
pub struct UpdateUserData {
  id: i32,
  email: Option<String>,
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

pub fn is_following(conn: &PgConnection, user_id: i32, other_user_id: i32) -> Result<bool, WebError> {
    use diesel::select;
    use diesel::dsl::exists;

    Ok(select(exists(follows::table.find((user_id, other_user_id)))).get_result(conn)?)
}

pub fn follow(conn: &PgConnection, followed_id: i32, follower_id: i32) -> Result<User, WebError> {
    let followed = users::table
        .filter(users::id.eq(followed_id))
        .get_result::<User>(conn)?;

    diesel::insert_into(follows::table)
        .values((
            follows::follower.eq(followed.id),
            follows::followed.eq(follower_id),
        ))
        .execute(conn)?;
    Ok(followed)
}

pub fn unfollow(conn: &PgConnection, followed_id: i32, follower_id: i32) -> Result<User, WebError> {
    let followed = users::table
        .filter(users::id.eq(followed_id))
        .get_result::<User>(conn)?;

    diesel::delete(follows::table.find((followed.id, follower_id))).execute(conn)?;

    Ok(followed)
}
