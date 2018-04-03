use juniper::Context as JuniperContext;
use db;
use models::user::User;

pub struct Context {
  pub conn: db::Conn,
  pub user: Option<User>,
}

impl JuniperContext for Context {}

impl Context {
  pub fn new(conn: db::Conn, user: Option<User>) -> Context {
    Context {
      conn: conn,
      user: user,
    }
  }
}
