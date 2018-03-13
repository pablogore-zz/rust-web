import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import client from './client';
import AppNavigator from './screens';

const App = () => (
  <ApolloProvider client={client}>
    <AppNavigator />
  </ApolloProvider>
);

export default App;
