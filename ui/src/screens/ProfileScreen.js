import React from 'react';
import { withApollo } from 'react-apollo';
import { Text3, Text5, Screen, Icon, Header, Row, Col, Button } from '../components';
import storageUtils from '../utils/storage';
import { user } from '../queries/user';
import { WHITE } from '../colors';

class ProfileScreen extends React.Component {

  static navigationOptions = () => ({
    header: <Header />,
    tabBarLabel: <Text5 value="Profile" color={WHITE} />,
    tabBarIcon: ({ tintColor }) => <Icon name="user" height="24" width="24" fill={tintColor} />,
    tabBarVisible: true,
  });

  onSignOutClicked = async () => {
    await storageUtils.set('token', '');
    await this.props.client.resetStore();
    this.props.navigation.navigate('SplashScreen');
  }

  render() {
    return (
      <Screen>
        <Col>
          <Text3 value={"This is the profile screen"} />
          <Button value="Sign Out" onClicked={() => this.onSignOutClicked()} />
        </Col>
      </Screen>
    );
  }
}

export default withApollo(ProfileScreen);
