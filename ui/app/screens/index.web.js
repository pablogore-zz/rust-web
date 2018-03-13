import * as React from 'react';
import { View, Text } from 'react-native';
import { TabRouter, addNavigationHelpers, createNavigator } from 'react-navigation/lib/react-navigation.web.js';
import AppFrame from './AppFrame';
import LoginScreen from './LoginScreen';

const NavView = ({ navigation, router }) => {
  const { state } = navigation;
  const Component = router.getComponentForState(state);
  return (
    <Component
      navigation={addNavigationHelpers({
        ...navigation,
        state: state.routes[state.index],
      })}
    />
  );
};

const NotFoundError = () => (
  <View>
    <Text>Page not found</Text>
  </View>
);

const AppNavigator = createNavigator(
  TabRouter({
    Home: {
      screen: LoginScreen,
      path: '',
    },
    Docs: {
      screen: NotFoundError,
      path: 'docs',
    },
    Blog: {
      screen: NotFoundError,
      path: 'blog',
    },
    NotFound: {
      screen: NotFoundError,
      navigationOptions: {
        title: 'Page Not Found | React Navigation',
      },
    },
  }),
)(AppFrame);

export default AppNavigator;
