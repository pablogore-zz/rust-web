import ApolloClient from 'apollo-boost';
import storageUtils from 'utils/storage';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  request: async (operation) => {
    console.log('operation', operation);
    const token = await storageUtils.get('token');
    if (token) {
      operation.setContext({
        headers: {
          authorization: token
        }
      });
    }
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
      console.log('networkError', networkError);
    }
  },
  clientState: {
    defaults: {
      isConnected: true
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } });
          return null;
        }
      }
    }
  },
});

export default client;
