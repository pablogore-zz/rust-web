#![feature(plugin, custom_derive)]
#![plugin(rocket_codegen)]

#[macro_use]
extern crate serde_derive;
extern crate serde_json;

extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
extern crate rocket_cors;

#[macro_use]
extern crate diesel;

#[macro_use]
extern crate juniper;
#[macro_use]
extern crate juniper_codegen;
extern crate juniper_rocket;

extern crate validator;
#[macro_use]
extern crate validator_derive;

extern crate crypto;
extern crate dotenv;

extern crate chrono;
extern crate frank_jwt as jwt;

extern crate rand;
extern crate slug;

#[macro_use]
extern crate quick_error;

mod db;
mod schema;
mod models;
mod errors;
mod auth;
mod util;
mod config;
mod routes;

use rocket::State;
use rocket::response::content;
use juniper_rocket::{graphiql_source, GraphQLRequest, GraphQLResponse};

#[get("/")]
fn graphiql() -> content::Html<String> {
  graphiql_source("/graphql")
}

#[post("/graphql", data = "<request>")]
fn graphql(conn: db::Conn, request: GraphQLRequest, schema: State<routes::Schema>) -> GraphQLResponse {
  let context = routes::context::Context::new(conn);
  request.execute(&schema, &context)
}

fn main() {
  let pool = db::init_pool();
  let schema = routes::init_schema();

  rocket::ignite()
    .mount("/", routes![graphiql, graphql])
    .manage(pool)
    .manage(schema)
    .launch();
}
