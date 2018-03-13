import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import client from './client';
import LoginScreen from './screens/LoginScreen';
import WebNavigator from './screens/index.web.js';

const App = () => (
  <ApolloProvider client={client}>
    <LoginScreen />
  </ApolloProvider>
);

export default App;
