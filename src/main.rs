#![feature(plugin, custom_derive)]
#![plugin(rocket_codegen)]

#[macro_use]
extern crate log;
extern crate fern;
extern crate colored;

#[macro_use]
extern crate serde_derive;
extern crate serde_json;

extern crate rocket;
#[macro_use]
extern crate rocket_contrib;

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

extern crate rand;
extern crate slug;

#[macro_use]
extern crate quick_error;

extern crate rusoto_core;
extern crate rusoto_sns;

extern crate rust_embed;

mod logger;
mod db;
mod schema;
mod models;
mod commands;
mod errors;
mod utils;
mod config;
mod graphql;

use std::path::PathBuf;
use std::ffi::OsStr;
use std::io::Cursor;
use rocket::response;
use rocket::http::{ContentType, Status};
use rocket::State;
use rust_embed::*;
use rocket::response::content;
use juniper_rocket::{graphiql_source, GraphQLRequest, GraphQLResponse};


#[get("/")]
fn index<'r>(asset: State<Asset>) -> response::Result<'r> {
  asset("index.html".to_owned()).map_or_else(
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
fn dist<'r>(asset: State<Asset>, file: PathBuf) -> response::Result<'r> {
  let filename = file.display().to_string();
  let ext = file.as_path().extension().and_then(OsStr::to_str).expect("Could not get file extension");
  let content_type = ContentType::from_extension(ext).expect("Could not get file content type");
  asset(filename.clone()).map_or_else(
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
fn graphiql() -> content::Html<String> {
  graphiql_source("/graphql")
}

#[post("/graphql", data = "<request>")]
fn graphql(conn: db::Conn, request: GraphQLRequest, schema: State<graphql::Schema>) -> GraphQLResponse {
  let context = graphql::context::Context::new(conn);
  request.execute(&schema, &context)
}

fn main() {
  logger::setup();
  let asset = embed!("ui/dist/".to_owned());
  let pool = db::init_pool();
  let schema = graphql::init_schema();

  rocket::ignite()
    .manage(asset)
    .manage(pool)
    .manage(schema)
    .mount("/", routes![index, dist, graphiql, graphql])
    .launch();
}
