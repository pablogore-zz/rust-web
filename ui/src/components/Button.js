import React from 'react';
import { string, func } from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PRIMARY, WHITE } from '../colors';
import { vw } from '../utils/window';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
    backgroundColor: PRIMARY,
    width: vw(80),
  },
  text: {
    fontSize: 16,
    color: WHITE,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
});

export default class Button extends React.Component {

  static propTypes = {
    value: string.isRequired,
    onClicked: func.isRequired,
  }

  render() {
    const { value, onClicked } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onClicked}>
        <Text style={styles.text}>{value}</Text>
      </TouchableOpacity>
    );
  }
}
