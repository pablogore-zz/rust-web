import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { colors, constants } from '../theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: Platform.OS === 'web' ? 300 : '70%',
    backgroundColor: '#0D430D',
  },
  element: {
    fontSize: constants.fontSizeNormal,
  },
});

const propTypes = {
  loading: PropTypes.bool,
  marginTop: PropTypes.number,
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const defaultProps = {
  loading: false,
  marginTop: 0,
  color: colors.white,
};

const Button = ({ loading, marginTop, color, title, onPress }) => {
  if (loading) {
    return (
      <View style={[styles.container, { marginTop, borderColor: color }]}>
        <ActivityIndicator size='large' color={color} />
      </View>
    );
  }
  return (
    <TouchableHighlight style={[styles.container, { marginTop, borderColor: color }]} onPress={onPress}>
      <Text style={[styles.element, { color }]}>{title}</Text>
    </TouchableHighlight>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
