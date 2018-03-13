import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Text, Button, ActivityIndicator, AsyncStorage } from 'react-native';
import { withState, compose } from 'recompose';
import { withMutation } from '../hocs/apollo';
import Input from '../components/Input';
import alert from '../utils/alert';
import errUtils from '../utils/err';
import stringUtils from '../utils/string';
import strings from '../strings';
import { colors, constants } from '../theme';
import { FORGOT_PASSWORD_MUTATION } from '../mutations';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  description: {
    color: colors.textGray,
    fontSize: constants.fontSizeLarge,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center',
  },
  errText: {
    color: 'red',
  },
});

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  email: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  onForgotPress: PropTypes.func.isRequired,
  forgotPasswordLoading: PropTypes.bool.isRequired,
};

const ForgotPasswordScreen = ({ navigation, email, password, error, setEmail, setPassword, onForgotPress, forgotPasswordLoading }) => (
  <View style={styles.screen}>
    <Text style={styles.description}>
      {strings.forgotPassword.description}
    </Text>
    <Input marginTop={30} value={email} setValue={setEmail} placeHolder='Email' />
    <View style={{ marginTop: 50 }}>
      <Text style={styles.errText}>{error && error}</Text>
    </View>
    <View style={{ marginTop: 50 }}>
      {forgotPasswordLoading && <ActivityIndicator />}
      {!forgotPasswordLoading && <Button title={strings.forgotPassword.submit} onPress={onForgotPress} />}
    </View>
  </View>
);

ForgotPasswordScreen.propTypes = propTypes;

export default compose(
  withState('email', 'setEmail', ''),
  withState('error', 'setError', ''),
  withMutation(FORGOT_PASSWORD_MUTATION, async ({ email, setError, setEmail, mutate }) => {
    if (!stringUtils.isEmail(email)) {
      return setError(strings.errs.email);
    }
    setError('');
    try {
      const res = await mutate({
        variables: {
          email,
        },
      });
      setEmail('');
      alert('Success!', 'We have sent you the email.');
    } catch (err) {
      const message = errUtils.toNotification(err);
      if (Platform.OS === 'web') {
        setError(message.body);
      } else {
        alert(message.title, message.body);
      }
    }
  }),
)(ForgotPasswordScreen);
