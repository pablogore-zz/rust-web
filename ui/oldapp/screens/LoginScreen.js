import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Platform, Alert, StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { withState, compose } from 'recompose';
import { withMutation } from '../hocs/apollo';
import BackgroundImage from '../components/BackgroundImage';
import Button from '../components/Button';
import Input from '../components/Input';
import alert from '../utils/alert';
import errUtils from '../utils/err';
import storageUtils from '../utils/storage';
import stringUtils from '../utils/string';
import strings from '../strings';
import { colors, constants } from '../theme';
import { LOGIN_USER_MUTATION } from '../mutations';
import NcmBg from '../../assets/ncmBg.png';
import NcmLogo from '../../assets/ncmLogo.png';

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: null,
    height: null,
  },
  title: {
    fontSize: constants.fontSizeLarger,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
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
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  loginUserLoading: PropTypes.bool.isRequired,
};

const LoginScreen = ({ setFile, navigation, email, password, error, setEmail, setPassword, loginUser, loginUserLoading }) => (
  <ImageBackground style={styles.bgImage} source={require('../../assets/ncmBg.png')}>
    <View style={styles.screen}>
      <Image source={NcmLogo} style={{ width: '80%', height: 200, opacity: 0.9 }} />
      <Input marginTop={30} value={email} setValue={setEmail} placeHolder='Email' />
      <Input marginTop={15} value={password} setValue={setPassword} hidden={true} placeHolder='Password' />
      <View style={{ marginTop: 20 }}>
        <Text style={styles.errText}>{error && error}</Text>
      </View>
      <Button marginTop={50} loading={loginUserLoading} title={strings.login.login} onPress={loginUser} />
    </View>
  </ImageBackground>
);

LoginScreen.propTypes = propTypes;

export default compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withState('error', 'setError', ''),
  withMutation(LOGIN_USER_MUTATION, async ({ navigation, email, password, setError, setEmail, setPassword, mutate, file }) => {
    if (!stringUtils.isEmail(email)) {
      return setError(strings.errs.email);
    }
    if (!stringUtils.isPassword(password)) {
      return setError(strings.errs.password);
    }
    setError('');
    try {
      const res = await mutate({
        variables: {
          email,
          password,
          file,
        },
      });
      await storageUtils.set('token', res.data.loginUser.token);
      setEmail('');
      setPassword('');
      navigation.navigate('MainScreen');
    } catch (err) {
      const message = errUtils.toNotification(err);
      if (Platform.OS === 'web') {
        setError(message.body);
      } else {
        alert(message.title, message.body);
      }
    }
  }),
)(LoginScreen);
