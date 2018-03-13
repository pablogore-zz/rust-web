import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Platform, StyleSheet, Text as RNText, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { colors } from '../theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: Platform.OS === 'web' ? 300 : '70%',
    borderWidth: 1,
    // borderRadius: 40,
    backgroundColor: '#0D430D',
  },
  element: {
    fontSize: 10,
  },
});

const Text = ({ value }) => (
  <RNText>{value}</RNText>
);

export default Text;
