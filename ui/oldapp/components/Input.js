import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Text, TextInput } from 'react-native';
import { withState, withHandlers, compose } from 'recompose';
import { colors } from '../theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: colors.white,
  },
  label: {
    color: colors.white,
    marginBottom: 5,
  },
  element: {
    fontSize: 14,
    color: colors.white,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
});

const propTypes = {
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  error: PropTypes.string,
  hidden: PropTypes.bool,
  width: PropTypes.any,
  marginTop: PropTypes.number,
  setValue: PropTypes.func.isRequired,
  validate: PropTypes.func,
};

const defaultProps = {
  placeHolder: '',
  error: '',
  hidden: false,
  width: Platform.OS === 'web' ? 300 : '70%',
  marginTop: 0,
  validate: (v) => '',
};

const Input = ({ value, placeHolder, error, hidden, width, marginTop, setValue }) => (
  <View style={[styles.container, { marginTop, width, height: 60 }]}>
    <Text style={styles.label}>
      {value && placeHolder}
    </Text>
    <TextInput
      style={styles.element}
      autoCapitalize='none'
      autoCorrect={false}
      secureTextEntry={hidden}
      placeholder={placeHolder}
      value={value}
      placeholderTextColor={colors.white}
      onChangeText={setValue}
      underlineColorAndroid='transparent'
    />
  </View>
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default compose(
  withState('e', 'setError', ''),
)(Input);
