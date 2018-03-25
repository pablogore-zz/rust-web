
import React from 'react';
import { View, Text } from 'react-native';
import { number, string } from 'prop-types';
import Input from './Input';
import PhoneInput from './PhoneInput';
import Button from './Button';
import Alert from './Alert';
import Loader from './Loader';
import ErrorBox from './ErrorBox';
import { BLACK, WHITE } from 'colors';

class Box extends React.Component {

  static propTypes = {
    flex: number,
    flexDirection: string,
    justify: string,
    align: string,
    bgColor: string,
    pad: number,
    margin: number,
    marginRight: number,
    marginLeft: number,
    marginTop: number,
    marginBottom: number,
  }

  static defaultProps = {
    // flex: 1,
    // justify: 'flex-start',
    // align: 'flex-start',
  }

  render() {
    const { children, justify, align, bgColor, pad, ...otherProps } = this.props;
    return (
      <View style={{ justifyContent: justify, alignItems: align, backgroundColor: bgColor, padding: pad, ...otherProps }}>
        {children}
      </View>
    )
  }

}

class TextRow extends React.Component {

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

const Row = (props) => (
  <Box flexDirection="row" {...props} />
);

const Col = (props) => (
  <Box flexDirection="column" {...props} />
);

const Screen = (props) => (
  <Col bgColor={WHITE} flex={1} align="center" {...props} />
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
  Screen,
  Button,
  Input,
  PhoneInput,
  Text1,
  Text2,
  Text3,
  Text4,
  Text5,
  Text6,
  Alert,
  Loader,
  ErrorBox,
};
