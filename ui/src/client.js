import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  // fetchOptions: {
    // credentials: 'include'
  // },
  // request: async (operation) => {
  //   const token = await AsyncStorage.getItem('token');
  //   operation.setContext({
  //     headers: {
  //       authorization: token
  //     }
  //   });
  // },
  // onError: ({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors) {
  //     sendToLoggingService(graphQLErrors);
  //   }
  //   if (networkError) {
  //     logoutUser();
  //   }
  // },
  // clientState: {
  //   defaults: {
  //     isConnected: true
  //   },
  //   resolvers: {
  //     Mutation: {
  //       updateNetworkStatus: (_, { isConnected }, { cache }) => {
  //         cache.writeData({ data: { isConnected }});
  //         return null;
  //       }
  //     }
  //   }
  // },
  // cacheRedirects: {
  //   Query: {
  //     movie: (_, { id }, { getCacheKey }) =>
  //       getCacheKey({ __typename: 'Movie', id });
  //   }
  // }
});

export default client;
