import React from 'react';
import { Text1, Text5, Screen } from 'components';
import { WHITE } from 'colors';

export default class FeedScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    // header: <Header left={null} />,
    tabBarLabel: <Text5 value="Feed" color={WHITE} />,
    // tabBarIcon: ({ tintColor }) => <FontAwesome name="bell" size={24} color={tintColor} />,
    tabBarVisible: true,
  });

  render() {
    return (
      <Screen justify="center">
        <Text1 value={"This is the feed screen"} />
      </Screen>
    );
  }
}
