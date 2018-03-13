import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Text, Button, ActivityIndicator, AsyncStorage } from 'react-native';
import { withState, compose } from 'recompose';
import { withMutation } from '../hocs/apollo';
import Input from '../components/Input';
import alert from '../utils/alert';
import errUtils from '../utils/err';
import storageUtils from '../utils/storage';
import stringUtils from '../utils/string';
import strings from '../strings';
import { colors } from '../theme';
import { SIGN_UP_USER_MUTATION } from '../mutations';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  errText: {
    color: 'red',
  },
});

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  retypedPassword: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setRetypedPassword: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired,
  signUpUserLoading: PropTypes.bool.isRequired,
};

const SignUpScreen = ({ navigation, username, email, password, retypedPassword, error, setUsername, setEmail, setPassword, setRetypedPassword, signUpUser, signUpUserLoading }) => (
  <View style={styles.screen}>
    <Text>
      {strings.signUp.title}
    </Text>
    <Input marginTop={20} value={username} setValue={setUsername} placeHolder='Name' />
    <Input marginTop={20} value={email} setValue={setEmail} placeHolder='Email' />
    <Input marginTop={20} value={password} setValue={setPassword} hidden={true} placeHolder='Password' />
    <Input marginTop={20} value={retypedPassword} setValue={setRetypedPassword} hidden={true} placeHolder='Retype Password' />
    <View style={{ marginTop: 30 }}>
      <Text style={styles.errText}>{error && error}</Text>
    </View>
    <View style={{ marginTop: 30 }}>
      {signUpUserLoading && <ActivityIndicator />}
      {!signUpUserLoading && <Button title={strings.signUp.signUp} onPress={signUpUser} />}
    </View>
    <View style={{ marginTop: 30 }}>
      <Button title={strings.signUp.back} onPress={() => navigation.goBack()} />
    </View>
  </View>
);

SignUpScreen.propTypes = propTypes;

export default compose(
  withState('username', 'setUsername', ''),
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withState('retypedPassword', 'setRetypedPassword', ''),
  withState('error', 'setError', ''),
)(SignUpScreen);
