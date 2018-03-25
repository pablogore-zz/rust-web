
import React from 'react';
import { View, Text } from 'react-native';
import { number, string } from 'prop-types';
import Input from './Input';
import Button from './Button';
import Alert from './Alert';
import Loader from './Loader';
import { colors } from '../theme';

class Box extends React.Component {

  static propTypes = {
    flex: number,
    flexDirection: string,
    justify: string,
    align: string,
    bgColor: string,
    pad: number,
  }

  static defaultProps = {
    // flex: 1,
    // justify: 'flex-start',
    // align: 'flex-start',
  }

  render() {
    const { children, flex, flexDirection, justify, align, bgColor, pad } = this.props;
    return (
      <View style={{ flex, justifyContent: justify, alignItems: align, backgroundColor: bgColor, padding: pad }}>
        {children}
      </View>
    )
  }

}

class TextRow extends React.Component {

  static propTypes = {
    fontSize: number.isRequired,
    color: string,
    value: string.isRequired,
  }

  static defaultProps = {
    color: colors.black,
  }

  static build = (fontSize) => ({ color, value }) => <TextRow fontSize={fontSize} color={color} value={value} />

  render() {
    const { fontSize, color, value } = this.props;
    return (
      <Text style={{ fontSize, color }}>{value}</Text>
    )
  }
}

const Row = (props) => (
  <Box flexDirection="row" {...props} />
);

const Col = (props) => (
  <Box flexDirection="column" {...props} />
);

const Text1 = TextRow.build(32);
const Text2 = TextRow.build(24);
const Text3 = TextRow.build(16);
const Text4 = TextRow.build(14);
const Text5 = TextRow.build(12);
const Text6 = TextRow.build(10);

export {
  Row,
  Col,
  Button,
  Input,
  Text1,
  Text2,
  Text3,
  Text4,
  Text5,
  Text6,
  Alert,
  Loader,
};
