import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Alert, StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { withState, compose } from 'recompose';
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

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

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
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

const LoginScreen = ({ setFile, navigation, email, password, error, setEmail, setPassword, loginUser, loginUserLoading }) => (
  <ImageBackground style={styles.bgImage}>
    <View style={styles.screen}>
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
)(LoginScreen);
