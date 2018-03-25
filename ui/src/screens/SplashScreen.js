import React from 'react';
import { Query } from 'react-apollo';
import { Row, Col, Screen, Button } from 'components';
import { user } from 'queries/user';

export default class SplashScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  onGetInClicked = () => {
    this.props.navigation.navigate('LoginScreen');
  }

  render() {
    const { navigation } = this.props;
    return (
      <Screen justify="center">
        <Button value="Get In" onClicked={this.onGetInClicked} />
      </Screen>
    );
  }
}
