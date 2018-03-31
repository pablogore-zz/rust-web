import React from 'react';
import { Text3, Text5, Screen, Icon, Header } from '../components';
import { WHITE } from '../colors';

export default class ProfileScreen extends React.Component {

  static navigationOptions = () => ({
    header: <Header />,
    tabBarLabel: <Text5 value="Profile" color={WHITE} />,
    tabBarIcon: ({ tintColor }) => <Icon name="user" height="24" width="24" fill={tintColor} />,
    tabBarVisible: true,
  });


  render() {
    return (
      <Screen>
        <Text3 value={"This is the profile screen"} />
      </Screen>
    );
  }
}
