import React from 'react';
import { Text3, Text5, Screen, Icon, Header } from 'components';
import { WHITE } from 'colors';

export default class FeedScreen extends React.Component {

  static navigationOptions = () => ({
    header: <Header />,
    tabBarLabel: <Text5 value="Feed" color={WHITE} />,
    tabBarIcon: ({ tintColor }) => <Icon name="home" height="24" width="24" fill={tintColor} />,
    tabBarVisible: true,
  });

  render() {
    return (
      <Screen justify="center">
        <Text3 value={"This is the feed screen"} />
      </Screen>
    );
  }
}
