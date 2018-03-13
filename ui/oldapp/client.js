import { ApolloClient } from 'apollo-client';
import { ApolloLink, execute, Observable } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import storageUtils from './utils/storage';
import config from './config';

// TODO: use this for local state
// https://github.com/Urigo/apollo-local-state-examples/blob/local-remote-schemas-merged/src/app/mergeLink.ts
const local = withClientState({
  Query: {
    messages: () => [],
  },
  Mutation: {
    selectMessage: (_, { messageId }, { cache }) => {
      const id = `Message:${messageId}`;
      const fragment = gql`
        fragment selectMessage on Message {
          __typename
          selected
        }
      `;
      const data = cache.readFragment({ fragment, id });
      data.selected = !data.selected;
      cache.writeFragment({ fragment, id, data });
      return data;
    },
  },
  Message: {
    selected: (source, args, context) => {
      return false;
    },
  },
});

// // cached storage for the user token
// let token;
// const withToken = setContext(() => {
//   // if you have a cached value, return it immediately
//   if (token) return { token };

//   return AsyncTokenLookup()
//     .then((userToken) => {
//       token = userToken;
//       return { token };
//     })
// });

// const resetToken = onError(({ networkError }) => {
//   if (networkError && networkError.statusCode === 401) {
//     // remove cached token on 401 from the server
//     token = null;
//   }
// });

const auth = setContext((request, context) => {
  return storageUtils.get('token')
    .then((token) => ({
      ...context,
      headers: {
        ...context.headers,
        Authorization: token || '',
      },
    }));
});

const upload = createUploadLink({ uri: config.uri });

const client = new ApolloClient({
  link: ApolloLink.from([
    local,
    auth,
    upload,
  ]),
  cache: new InMemoryCache(),
});

export default client;
