
import React from 'react';
import { Text } from 'react-native';
import { number, string } from 'prop-types';
import { BLACK } from 'colors';

export default class TextRow extends React.Component {

  static propTypes = {
    fontSize: number.isRequired,
    fontWeight: string,
    color: string,
    value: string.isRequired,
  }

  static defaultProps = {
    color: BLACK,
  }

  static build = (fontSize) => ({ color, fontWeight, value }) => <TextRow fontSize={fontSize} fontWeight={fontWeight} color={color} value={value} />

  render() {
    const { fontSize, fontWeight, color, value } = this.props;
    return (
      <Text style={{ fontSize, fontWeight, color }}>{value}</Text>
    )
  }
}
