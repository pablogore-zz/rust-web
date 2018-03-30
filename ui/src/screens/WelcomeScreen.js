import React from 'react';
import { Row, Text1, Button, Screen } from 'components';

export default class NotificationScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
  });

  onNextClicked = () => {
    this.props.navigation.navigate('TabScreen');
  }

  render() {
    return (
      <Screen justify="center">
        <Text1 value={"This is the welcome screen"} />
        <Button value="Next" onClicked={this.onNextClicked} />
      </Screen>
    );
  }
}
