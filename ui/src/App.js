import React, { Component } from 'react';
import { StyleSheet, View, PushNotificationIOS } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { StackNavigator, TabNavigator } from 'react-navigation';
import PushNotification from 'react-native-push-notification';
import client from './client';
import { SECONDARY } from './colors';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import VerifyScreen from './screens/VerifyScreen';

import FeedScreen from './screens/FeedScreen';
import ExploreScreen from './screens/ExploreScreen';
import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const TabScreen = TabNavigator({
  FeedScreen: {
    screen: FeedScreen,
  },
  ExploreScreen: {
    screen: ExploreScreen,
  },
  NotificationScreen: {
    screen: NotificationScreen,
  },
  ProfileScreen: {
    screen: ProfileScreen,
  },
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      scrollEnabled: false,
      style: {
        marginBottom: -2,
        backgroundColor: SECONDARY,
      },
    },
  });

const Navigator = StackNavigator({
  SplashScreen: {
    screen: SplashScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  VerifyScreen: {
    screen: VerifyScreen
  },
  WelcomeScreen: {
    screen: WelcomeScreen,
  },
  TabScreen: {
    screen: TabScreen,
  },
});

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
    // PushNotificationsHandler.requestPermissions()
  },
  senderID: "745661436636",
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },
  // popInitialNotification: true,
  requestPermissions: true,
});

export default class App extends Component {

  componentDidMount() {
    console.log('GGG:');
    // PushNotification.requestPermissions();
    // PushNotification.localNotification({
    //   largeIcon: "ic_launcher",
    //   smallIcon: "ic_notification",
    //   title: "My Notification Title",
    //   message: "My Notification Message",
    // });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    )
  }
}

// d9344d26-62ab-47ac-9d57-d254cf4dfd31