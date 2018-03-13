import * as React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import FeedScreen from './FeedScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';

import strings from '../strings';
import { colors, base } from '../theme';

const MainScreen = TabNavigator({
  FeedScreen: {
    screen: FeedScreen,
    navigationOptions: {
      tabBarLabel: <View><Text style={base.tabLabel}>{strings.nav.tabBar.feed}</Text></View>,
      tabBarIcon: ({ tintColor }) => <FontAwesome name='bolt' size={24} color={tintColor} />,
      tabBarVisible: true,
    },
  },
  ExploreScreen: {
    screen: FeedScreen,
    navigationOptions: {
      header: null,
      tabBarLabel: <View><Text style={base.tabLabel}>{strings.nav.tabBar.explore}</Text></View>,
      tabBarIcon: ({ tintColor }) => <FontAwesome name='search' size={24} color={tintColor} />,
      tabBarVisible: true,
    },
  },
  NotificationScreen: {
    screen: NotificationScreen,
    navigationOptions: {
      tabBarLabel: <View><Text style={base.tabLabel}>{strings.nav.tabBar.activity}</Text></View>,
      tabBarIcon: ({ tintColor }) => <FontAwesome name='bell' size={24} color={tintColor} />,
      tabBarVisible: true,
    },
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: <View><Text style={base.tabLabel}>{strings.nav.tabBar.me}</Text></View>,
      tabBarIcon: ({ tintColor }) => <FontAwesome name='user' size={24} color={colors.icon} />,
      tabBarVisible: true,
    },
  },
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      scrollEnabled: false,
      style: {
        marginBottom: -2,
        backgroundColor: colors.tabBarBg,
      },
    },
  });

const AppNavigator = StackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null,
    },
  },
  ForgotPasswordScreen: {
    screen: ForgotPasswordScreen,
    navigationOptions: {
      title: strings.forgotPassword.title,
      headerBackTitleStyle: {
        color: colors.white,
      },
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTitleStyle: {
        color: colors.white,
      },
    },
  },
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export default AppNavigator;
