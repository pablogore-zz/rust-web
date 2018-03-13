import { ApolloClient } from 'apollo-client';
import { ApolloLink, execute, Observable } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import storageUtils from './utils/storage';
import config from './config';