import React from 'react';
import { Text3, Text5, Screen, Icon, Header } from 'components';
import { WHITE } from 'colors';

export default class NotificationScreen extends React.Component {

  static navigationOptions = () => ({
    header: <Header />,
    tabBarLabel: <Text5 value="Notification" color={WHITE} />,
    tabBarIcon: ({ tintColor }) => <Icon name="bell" height="24" width="24" fill={tintColor} />,
    tabBarVisible: true,
  });

  render() {
    return (
      <Screen>
        <Text3 value={"This is the notification screen"} />
      </Screen>
    );
  }
}
