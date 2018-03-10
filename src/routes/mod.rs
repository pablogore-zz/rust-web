pub mod articles;

pub mod user;
pub mod query;
pub mod mutation;
pub mod context;

use juniper::RootNode;
use self::query::QueryRoot;
use self::mutation::MutationRoot;

pub type Schema = RootNode<'static, QueryRoot, MutationRoot>;

pub fn init_schema() -> Schema {
    Schema::new(QueryRoot {}, MutationRoot {})
}
