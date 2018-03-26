#![feature(plugin, custom_derive, custom_attribute, attr_literals)]
#![plugin(rocket_codegen)]

extern crate colored;
extern crate fern;
#[macro_use]
extern crate log;

extern crate serde;
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

extern crate chrono;
extern crate frank_jwt as jwt;

#[macro_use]
extern crate quick_error;
#[macro_use]
extern crate rust_embed;

extern crate reqwest;

mod logger;
mod db;
mod schema;
mod models;
mod commands;
mod errors;
mod utils;
mod config;
mod graphql;
mod services;

use std::path::PathBuf;
use std::ffi::OsStr;
use std::io::Cursor;
use rocket::response;
use rocket::http::{ContentType, Status};
use rocket::State;
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use utils::auth::ReqToken;
use utils::context::Context;
use utils::graphql::EDITOR_HTML;

#[derive(RustEmbed)]
#[folder("ui/dist/")]
struct Asset;

#[get("/")]
fn index<'r>() -> response::Result<'r> {
  Asset::get("index.html").map_or_else(
    || Err(Status::NotFound),
    |d| {
      response::Response::build()
        .header(ContentType::HTML)
        .sized_body(Cursor::new(d))
        .ok()
    },
  )
}

#[get("/dist/<file..>")]
fn dist<'r>(file: PathBuf) -> response::Result<'r> {
  let filename = file.display().to_string();
  let ext = file
    .as_path()
    .extension()
    .and_then(OsStr::to_str)
    .expect("Could not get file extension");
  let content_type = ContentType::from_extension(ext).expect("Could not get file content type");
  Asset::get(&filename.clone()).map_or_else(
    || Err(Status::NotFound),
    |d| {
      response::Response::build()
        .header(content_type)
        .sized_body(Cursor::new(d))
        .ok()
    },
  )
}

#[get("/graphql")]
fn graphiql<'r>() -> response::Result<'r> {
  response::Response::build()
    .header(ContentType::HTML)
    .sized_body(Cursor::new(EDITOR_HTML))
    .ok()
}

#[post("/graphql", format = "application/json", data = "<request>", rank = 2)]
fn graphql(conn: db::Conn, token: ReqToken, request: GraphQLRequest, schema: State<graphql::Schema>) -> GraphQLResponse {
  let user = match token.0 {
    Some(auth) => match models::user::User::find_one(&conn.0, auth.user_id) {
      Ok(user) => Some(user),
      Err(_) => None,
    },
    None => None,
  };
  let context = Context::new(conn, user);
  request.execute(&schema, &context)
}

fn main() {
  logger::setup();
  let pool = db::init_pool();
  let schema = graphql::init_schema();

  rocket::ignite()
    .manage(pool)
    .manage(schema)
    .mount("/", routes![index, dist, graphiql, graphql])
    .attach(rocket_cors::Cors::default())
    .launch();
}
