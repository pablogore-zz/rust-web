import React from 'react';
import { string, func } from 'prop-types';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { TRANSPARENT, GRAY_LIGHT, BLACK } from '../colors';
import { vw } from '../utils/window';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: TRANSPARENT,
    borderBottomWidth: 1,
    borderColor: GRAY_LIGHT,
  },
  element: {
    fontSize: 12,
    color: BLACK,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
});

const Input = ({ value = '', placeHolder = '', isSecure = false, width = vw(80), height = 50, marginTop = 0, onChange }) => (
  <View style={[styles.container, { marginTop, width, height }]}>
    <TextInput
      style={[styles.element, { height }]}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={isSecure}
      placeholder={placeHolder}
      value={value}
      placeholderTextColor={BLACK}
      onChangeText={onChange}
      underlineColorAndroid="transparent"
    />
  </View>
);

export default Input;
