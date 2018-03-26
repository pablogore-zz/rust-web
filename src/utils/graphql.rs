pub static EDITOR_HTML: &'static str = r#"
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<title>GraphiQL</title>
			<meta name="robots" content="noindex" />
			<style>
			  html, body, #app {
          height: 100%;
          margin: 0;
          overflow: hidden;
          width: 100%;
        }
			</style>
      <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/graphiql/0.11.2/graphiql.css">
		</head>
		<body>
			<div id="app"></div>
			<script src="//cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/graphiql/0.11.11/graphiql.min.js"></script>
			<script src="//cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js"></script>
			<script>
				var parameters = {};
				function graphQLFetcher(graphQLParams) {
					var token = localStorage.getItem('token');
					var headers = {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					};
					if (token) {
						headers['Authorization'] = token;
					}
					return fetch(window.location.origin + '/graphql', {
						method: 'post',
						headers: headers,
						body: JSON.stringify(graphQLParams),
					}).then(function (response) {
						return response.text();
					}).then(function (responseBody) {
						try {
							const json = JSON.parse(responseBody);
							const token = _.get(json,  'data.verify.token', '');
							if (token) {
								localStorage.setItem('token', token);
							}
							return json;
						} catch (error) {
							return responseBody;
						}
					});
				}
				function onEditQuery(newQuery) {
					parameters.query = newQuery;
				}
				function onEditVariables(newVariables) {
					parameters.variables = newVariables || '{}';
				}
				function onEditOperationName(newOperationName) {
					parameters.operationName = newOperationName;
				}
				ReactDOM.render(
					React.createElement(GraphiQL, { fetcher: graphQLFetcher }),
					document.querySelector('#app')
				);
			</script>
		</body>
		</html>
"#;
