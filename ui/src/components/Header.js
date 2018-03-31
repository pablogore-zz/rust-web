import React from 'react';
import { bool } from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { PRIMARY, WHITE } from '../colors';
import { vw } from '../utils/window';
import { Text3 } from './index';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: vw(100),
    height: 50,
    backgroundColor: PRIMARY,
    shadowOpacity: 0,
    elevation: 0,
    shadowColor: 'transparent',
    borderBottomWidth: 0,
  },
  hasLeft: {
    width: vw(70),
  },
});



export default class Header extends React.Component {

  static propTypes = {
    hasLeft: bool,
  }

  static defaultProps = {
    hasLeft: false,
  }

  render() {
    const { hasLeft } = this.props;
    return (
      <View style={[styles.container, hasLeft ? styles.hasLeft : {}]}>
        <Text3 value="HSG" color={WHITE} fontWeight="bold" />
      </View>
    );
  }
}
