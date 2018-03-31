import React from 'react';
import { StyleSheet } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { Row, Col, Screen, Text1, Text2, Text3, Text4, PhoneInput, OtpInput, Button, Alert, Loader, ErrorBox } from '../components';
import { GRAY, GRAY_LIGHT } from '../colors';
import { verify, retryOtp } from '../queries/user';
import storageUtils from '../utils/storage';

export default class VerifyScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    otp: '',
  }

  setOtp = (otp) => {
    this.setState({ otp });
  }

  onClicked = async (mutate) => {
    const { params: { phone } } = this.props.navigation.state;
    const { otp } = this.state;
    const { data: { verify } } = await mutate({ variables: { params: { phone, otp } } });
    await storageUtils.set('token', verify.token)
    this.props.navigation.navigate('WelcomeScreen');
  }

  render() {
    const { otp } = this.state;
    return (
      <Screen>
        <Col marginTop={30}>
          <Row justify="center">
            <Text2 color={GRAY} value="What's your verification code?" />
          </Row>
          <OtpInput value={otp} onChange={this.setOtp} />
          <Row justify="center" marginTop={30}>
            <Mutation mutation={verify}>
              {(mutate, { loading, error, data }) => {
                if (loading) {
                  return <Loader />;
                }
                return (
                  <Col>
                    <Button value="Verify Confirmation Code" onClicked={() => this.onClicked(mutate)} />
                    {error && <ErrorBox error={error} />}
                  </Col>
                );
              }}
            </Mutation>
          </Row>
          <Row margin={30}>
            <Text4 color={GRAY_LIGHT} value={`Resend Verification Code`} />
          </Row>
        </Col>
      </Screen>
    );
  }
}

//         setTimeout(() => {
//           Alert.alert('Sent!', "We've sent you a verification code", [{
//             text: 'OK',
//             onPress: () => this.refs.form.refs.textInput.focus()
//           }]);
//         }, 100);

//         setTimeout(() => {
//           Alert.alert('Success!', 'You have successfully verified your phone number');
//         }, 100);

//         // <https://github.com/niftylettuce/react-native-loading-spinner-overlay/issues/30#issuecomment-276845098>
//         this.setState({ spinner: false });
//         setTimeout(() => {
//           Alert.alert('Oops!', err.message);
//         }, 100);