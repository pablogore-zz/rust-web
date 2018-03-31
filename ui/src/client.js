import ApolloClient from 'apollo-boost';
import storageUtils from './utils/storage';
import log from './utils/log';
import config from './config';

const client = new ApolloClient({
  uri: config.uri,
  request: async (operation) => {
    log.info('operation', operation);
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
      log.info('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
      log.info('networkError', networkError);
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
