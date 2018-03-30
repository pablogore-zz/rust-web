import React from 'react';
import { Row, Col, Screen, Button, Loader, ErrorBox, Query } from 'components';
import { user } from 'queries/user';

export default class SplashScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  onGetInClicked = (data) => {
    if (data) {
      this.props.navigation.navigate('WelcomeScreen');
    } else {
      this.props.navigation.navigate('LoginScreen');
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <Screen justify="center">
        <Query query={user}>
          {(data) => (
            <Col>
              <Button value="Get In" onClicked={() => this.onGetInClicked(data)} />
            </Col>
          )}
        </Query>
      </Screen>
    );
  }
}
