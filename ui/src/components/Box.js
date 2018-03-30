import React from 'react';
import { View } from 'react-native';
import { number, string } from 'prop-types';

export default class Box extends React.Component {

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

  render() {
    const { children, justify, align, bgColor, pad, ...otherProps } = this.props;
    return (
      <View style={{ justifyContent: justify, alignItems: align, backgroundColor: bgColor, padding: pad, ...otherProps }}>
        {children}
      </View>
    )
  }
}
