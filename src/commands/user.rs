pub fn login<'a>(conn: &PgConnection, email: String, password: String) -> Result<User, WebError> {
  let user = users::table
    .filter(users::email.eq(email))
    .get_result::<User>(conn)?;

  match scrypt_check(&password, &user.hash).unwrap() {
      true => Ok(user),
      false => Err(WebError::Validation("invalid credentials")),
  }
}