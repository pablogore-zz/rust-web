import React from 'react';
import { StyleSheet } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { Row, Col, Screen, Text1, Text2, Text3, Text4, PhoneInput, Button, Alert, Loader, ErrorBox } from 'components';
import { colors } from 'theme';
import { login } from 'queries/user';

export default class LoginScreen extends React.Component {

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

  //   _renderFooter = () => {

  //     if (this.state.enterCode)
  //       return (
  //         <View>
  //           <Text style={styles.wrongNumberText} onPress={this._tryAgain}>
  //             Enter the wrong number or need a new code?
  //           </Text>
  //         </View>
  //       );

  //     return (
  //       <View>
  //         
  //       </View>
  //     );
  //   }

  render() {
    const { cca2, cc, phone } = this.state;
    return (
      <Screen>
        <Col marginTop={30}>
          <Row justify="center">
            <Text2 color={colors.textGrayBold} value={'Whats your phone number?'} />
          </Row>
          <PhoneInput value={phone} onChange={this.setPhone} onSubmit={this.onSubmit} />
          <Row justify="center" marginTop={30}>
            <Mutation mutation={login}>
              {(mutate, { loading, error, data }) => {
                if (loading) {
                  return <Loader />;
                }
                return (
                  <Col>
                    <Button value="Send Confirmation Code" onClicked={() => mutate({ variables: { params: { phone } } })} />
                    {error && <ErrorBox error={error} />}
                  </Col>
                );
              }}
            </Mutation>
          </Row>
          <Row margin={30}>
            <Text4 color={colors.gray} value={`By tapping "Send confirmation code" above, we will send you an SMS to confirm your phone number. Message & data rates may apply.`} />
          </Row>
        </Col>
      </Screen>
    );
  }
}


// const styles = StyleSheet.create({
//   textInput: {
//     padding: 0,
//     margin: 0,
//     flex: 1,
//     fontSize: 20,
//     color: brandColor
//   },
//   wrongNumberText: {
//     margin: 10,
//     fontSize: 14,
//     textAlign: 'center'
//   },
//   disclaimerText: {
//     marginTop: 30,
//     fontSize: 12,
//     color: 'grey'
//   },
// });

// export default class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       enterCode: false,
//       spinner: false,
//       country: {
//         cca2: 'US',
//         callingCode: '1'
//       }
//     };
//   }

//   _getCode = () => {

//     this.setState({ spinner: true });

//     setTimeout(async () => {

//       try {

//         const res = await api.post('/v1/verifications', {
//           body: {
//             ...this.refs.form.getValues(),
//             ...this.state.country
//           }
//         });

//         if (res.err) throw res.err;

//         this.setState({
//           spinner: false,
//           enterCode: true,
//           verification: res.body
//         });
//         this.refs.form.refs.textInput.setNativeProps({ text: '' });

//         setTimeout(() => {
//           Alert.alert('Sent!', "We've sent you a verification code", [{
//             text: 'OK',
//             onPress: () => this.refs.form.refs.textInput.focus()
//           }]);
//         }, 100);

//       } catch (err) {
//         // <https://github.com/niftylettuce/react-native-loading-spinner-overlay/issues/30#issuecomment-276845098>
//         this.setState({ spinner: false });
//         setTimeout(() => {
//           Alert.alert('Oops!', err.message);
//         }, 100);
//       }

//     }, 100);

//   }

//   _verifyCode = () => {

//     this.setState({ spinner: true });

//     setTimeout(async () => {

//       try {

//         const res = await api.put('/v1/verifications', {
//           body: {
//             ...this.refs.form.getValues(),
//             ...this.state.country
//           }
//         });

//         if (res.err) throw res.err;

//         this.refs.form.refs.textInput.blur();
//         // <https://github.com/niftylettuce/react-native-loading-spinner-overlay/issues/30#issuecomment-276845098>
//         this.setState({ spinner: false });
//         setTimeout(() => {
//           Alert.alert('Success!', 'You have successfully verified your phone number');
//         }, 100);

//       } catch (err) {
//         // <https://github.com/niftylettuce/react-native-loading-spinner-overlay/issues/30#issuecomment-276845098>
//         this.setState({ spinner: false });
//         setTimeout(() => {
//           Alert.alert('Oops!', err.message);
//         }, 100);
//       }

//     }, 100);

//   }

//   render() {

//     let headerText = `What's your ${this.state.enterCode ? 'verification code' : 'phone number'}?`
//     let buttonText = this.state.enterCode ? 'Verify confirmation code' : 'Send confirmation code';

//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>{headerText}</Text>
//         <Form ref={'form'} style={styles.form}>
//           <View style={{ flexDirection: 'row' }}>
//           {this._renderFooter()}
//         </Form>
//         <Spinner
//           visible={this.state.spinner}
//           textContent={'One moment...'}
//           textStyle={{ color: '#fff' }} />
//       </View>
//     );
//   }
// }
