import React from 'react';
import { Row, Col, Text3, Button, Screen } from '../components';

export default class NotificationScreen extends React.Component {

  static navigationOptions = () => ({
    header: null,
  });

  onNextClicked = () => {
    this.props.navigation.navigate('TabScreen');
  }

  render() {
    return (
      <Screen>
        <Col flex={1}>
          <Col flex={0.2} align="center" justify="center">
            <Text3 value={"This is the welcome screen"} />
          </Col>
          <Col flex={0.8} align="center" justify="center">
            <Button value="Next" onClicked={this.onNextClicked} />
          </Col>
        </Col>
      </Screen>
    );
  }
}
