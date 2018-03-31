import React from 'react';
import { Text3, Text5, Screen, Icon, Header } from '../components';
import { WHITE } from '../colors';

export default class ExploreScreen extends React.Component {

  static navigationOptions = () => ({
    header: <Header />,
    tabBarLabel: <Text5 value="Explore" color={WHITE} />,
    tabBarIcon: ({ tintColor }) => <Icon name="search" height="24" width="24" fill={tintColor} />,
    tabBarVisible: true,
  });

  render() {
    return (
      <Screen justify="center">
        <Text3 value={"This is the explore screen"} />
      </Screen>
    );
  }
}
