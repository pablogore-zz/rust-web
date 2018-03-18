use juniper::Context as JuniperContext;
use db;

pub struct Context {
    pub conn: db::Conn,
}

impl JuniperContext for Context {}

impl Context {
    pub fn new(conn: db::Conn) -> Context {
        Context { conn: conn }
    }
}
