use diesel;
use diesel::prelude::*;
use diesel::pg::PgConnection;
use errors::WebError;
use schema::{follows, users};

#[derive(Queryable, Clone, Serialize, Deserialize)]
pub struct User {
  pub id: i32,
  pub phone: String,
}

#[derive(Clone, Insertable)]
#[table_name = "users"]
pub struct NewUser<'a> {
  pub phone: &'a str,
}

#[derive(Deserialize, AsChangeset, Default, Clone)]
#[table_name = "users"]
pub struct UpdateUser {
  pub  id: i32,
  pub  phone: Option<String>,
}

impl User {
  pub fn find_one(conn: &PgConnection, id: i32) -> Result<User, WebError> {
    Ok(users::table.find(id).get_result::<User>(conn)?)
  }

  pub fn find_one_by_phone(conn: &PgConnection, phone: &String) -> Result<User, WebError> {
    Ok(users::table
      .filter(users::phone.eq(phone))
      .get_result::<User>(conn)?)
  }

  pub fn exists_by_phone(conn: &PgConnection, phone: &String) -> Result<bool, WebError> {
    let n: i64 = users::table
      .filter(users::phone.eq(phone))
      .count()
      .get_result(conn)?;
    Ok(n != 0)
  }

  pub fn find_all(conn: &PgConnection, offset: i64, limit: i64) -> Result<Vec<User>, WebError> {
    Ok(users::table.offset(offset).limit(limit).load::<User>(conn)?)
  }

  pub fn create(conn: &PgConnection, data: NewUser) -> Result<User, WebError> {
    Ok(diesel::insert_into(users::table)
      .values(&data)
      .get_result(conn)?)
  }

  pub fn update(conn: &PgConnection, data: UpdateUser) -> Result<User, WebError> {
    Ok(diesel::update(users::table.find(&data.id))
      .set(&data)
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
}
