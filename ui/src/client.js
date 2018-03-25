import { AsyncStorage } from 'react-native';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: (operation) => {
    return AsyncStorage.getItem('token')
      .then((token) => {
        operation.setContext({
          headers: {
            authorization: token
          }
        });
      })
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
