import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { StackNavigator, TabNavigator } from 'react-navigation';
import client from './client';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

const Navigator = StackNavigator({
  SplashScreen: {
    screen: SplashScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  ProfileScreen: {
    screen: ProfileScreen
  },
});

export default class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    )
  }
}
