use models::user::User;

graphql_object!(User: () |&self| {
    field id() -> i32 {
        self.id
    }

    field username() -> &str {
        &self.username
    }
    
    field email() -> &str {
        &self.email
    }

    field bio() -> &Option<String> {
        &self.bio
    }
});
