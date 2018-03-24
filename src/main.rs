// #![feature(plugin, custom_derive, custom_attribute, attr_literals)]
// #![plugin(rocket_codegen)]

// use std::path::PathBuf;
// use std::ffi::OsStr;
// use std::io::Cursor;
// use rocket::response;
// use rocket::http::{ContentType, Status};
// use rocket::State;
// use rocket::response::content;
// use juniper_rocket::{graphiql_source, GraphQLRequest, GraphQLResponse};

// #[derive(RustEmbed)]
// #[folder("ui/dist/")]
// struct Asset;

// #[get("/")]
// fn index<'r>() -> response::Result<'r> {
//   Asset::get("index.html").map_or_else(
//     || Err(Status::NotFound),
//     |d| {
//       response::Response::build()
//         .header(ContentType::HTML)
//         .sized_body(Cursor::new(d))
//         .ok()
//     },
//   )
// }

// #[get("/dist/<file..>")]
// fn dist<'r>(file: PathBuf) -> response::Result<'r> {
//   let filename = file.display().to_string();
//   let ext = file
//     .as_path()
//     .extension()
//     .and_then(OsStr::to_str)
//     .expect("Could not get file extension");
// let content_type = ContentType::from_extension(ext).expect("Could not get
// file content type");   Asset::get(&filename.clone()).map_or_else(
//     || Err(Status::NotFound),
//     |d| {
//       response::Response::build()
//         .header(content_type)
//         .sized_body(Cursor::new(d))
//         .ok()
//     },
//   )
// }

extern crate actix;
extern crate actix_redis;
extern crate actix_web;
extern crate futures;

extern crate colored;
extern crate fern;
#[macro_use]
extern crate log;

extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate serde_json;

#[macro_use]
extern crate diesel;

#[macro_use]
extern crate juniper;
#[macro_use]
extern crate juniper_codegen;

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

use actix::*;
use actix_web::*;
use juniper::http::graphiql::graphiql_source;
use juniper::http::GraphQLRequest;
use actix_web::middleware::RequestSession;
use actix_redis::RedisSessionBackend;
use futures::future::Future;

struct State {
  executor: Addr<Syn, GraphQLExecutor>,
}

#[derive(Serialize, Deserialize)]
pub struct GraphQLData {
  req: GraphQLRequest,
  user_id: Option<i32>,
}

impl Message for GraphQLData {
  type Result = Result<String, Error>;
}

pub struct GraphQLExecutor {
  schema: std::sync::Arc<graphql::Schema>,
  pool: db::Pool,
}

impl GraphQLExecutor {
  fn new(schema: std::sync::Arc<graphql::Schema>, pool: db::Pool) -> GraphQLExecutor {
    GraphQLExecutor {
      schema: schema,
      pool: pool,
    }
  }
}

impl Actor for GraphQLExecutor {
  type Context = SyncContext<Self>;
}

impl Handler<GraphQLData> for GraphQLExecutor {
  type Result = Result<String, Error>;

  fn handle(&mut self, msg: GraphQLData, _: &mut Self::Context) -> Self::Result {
    let conn = self.pool.get().unwrap();
    let user = msg.user_id.map(|id| models::user::User::find_one(&conn, id).unwrap());
    let context = graphql::context::Context::new(db::Conn(conn), user);
    let res = msg.req.execute(&self.schema, &context);
    let res_text = serde_json::to_string(&res)?;
    Ok(res_text)
  }
}

fn index(mut req: HttpRequest<State>) -> Result<HttpResponse> {
  println!("{:?}", req);

  // session
  if let Some(count) = req.session().get::<i32>("counter")? {
    println!("SESSION value: {}", count);
    req.session().set("counter", count + 1)?;
  } else {
    req.session().set("counter", 1)?;
  }

  Ok("Welcome!".into())
}

fn graphiql(_req: HttpRequest<State>) -> Result<HttpResponse> {
  let html = graphiql_source("http://localhost:8080/graphql");
  Ok(
    HttpResponse::build(StatusCode::OK)
      .content_type("text/html; charset=utf-8")
      .body(html)
      .unwrap(),
  )
}

fn graphql(mut req: HttpRequest<State>) -> Box<Future<Item = HttpResponse, Error = Error>> {
  let executor = req.state().executor.clone();
  // req.session().set("user_id", 1 as i32).unwrap();
  let user_id = req.session().get::<i32>("user_id").unwrap();
  req
    .json()
    .from_err()
    .and_then(move |req: GraphQLRequest| {
      executor.send(GraphQLData{req: req, user_id: user_id }).from_err().and_then(|res| match res {
        Ok(user) => Ok(httpcodes::HTTPOk.build().body(user)?),
        Err(_) => Ok(httpcodes::HTTPInternalServerError.into()),
      })
    })
    .responder()
}

fn main() {
  ::std::env::set_var("RUST_LOG", "actix_web=info");
  logger::setup();
  let pool = db::init_pool();
  let sys = actix::System::new("juniper-example");

  let schema = std::sync::Arc::new(graphql::init_schema());
  let addr = SyncArbiter::start(3, move || {
    GraphQLExecutor::new(schema.clone(), pool.clone())
  });

  let _addr = HttpServer::new(move || {
    Application::with_state(State {
      executor: addr.clone(),
    })
    .middleware(middleware::Logger::default())
    .middleware(middleware::SessionStorage::new(RedisSessionBackend::new("127.0.0.1:6379", &[0; 32])))
    .resource("/graphql", |r| r.method(Method::POST).a(graphql))
    .resource("/graphiql", |r| r.method(Method::GET).f(graphiql))
    .resource("/", |r| r.method(Method::GET).f(index))
  }).bind("localhost:8080")
    .unwrap()
    .start();
  let _ = sys.run();
}
