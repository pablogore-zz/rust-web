import React from 'react';
import { StyleSheet } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { Row, Col, Screen, Text1, Text2, Text3, Text4, PhoneInput, Button, Alert, Loader, ErrorBox } from 'components';
import { GRAY, GRAY_LIGHT } from 'colors';
import { login } from 'queries/user';

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    cca2: '',
    cc: '',
    phone: '',
  }

  setPhone = (cca2, cc, phone) => {
    this.setState({ cca2, cc, phone });
  }

  onSubmit = (gg) => {
    console.log('gg', gg, this.state.phone);
  }

  onClicked = async (mutate) => {
    const { cca2, cc, phone } = this.state;
    const intlPhone = `${cc}${phone}`;
    await mutate({ variables: { params: { phone: intlPhone } } });
    this.props.navigation.navigate('VerifyScreen', { phone: intlPhone });
  }

  render() {
    const { phone } = this.state;
    return (
      <Screen>
        <Col marginTop={30}>
          <Row justify="center">
            <Text2 color={GRAY} value="What's your phone number?" />
          </Row>
          <PhoneInput value={phone} onChange={this.setPhone} onSubmit={this.onSubmit} />
          <Row justify="center" marginTop={30}>
            <Mutation mutation={login}>
              {(mutate, { loading, error }) => {
                if (loading) {
                  return <Loader />;
                }
                return (
                  <Col>
                    <Button value="Send Confirmation Code" onClicked={() => this.onClicked(mutate)} />
                    {error && <ErrorBox error={error} />}
                  </Col>
                );
              }}
            </Mutation>
          </Row>
          <Row margin={30}>
            <Text4 color={GRAY_LIGHT} value={`By tapping "Send confirmation code" above, we will send you an SMS to confirm your phone number. Message & data rates may apply.`} />
          </Row>
        </Col>
      </Screen>
    );
  }
}
