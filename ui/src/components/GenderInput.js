import React from 'react';
import { View, Picker } from 'react-native';
import { string, func } from 'prop-types';
import { GRAY_LIGHT } from '../colors';
import { vw } from '../utils/window';

export default class GenderInput extends React.Component {

  static propTypes = {
    value: string.isRequired,
    onChange: func,
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <View>
        <Picker style={{ width: vw(90) }} selectedValue={value} onValueChange={onChange}>
          <Picker.Item label='Select' value={''} />
          <Picker.Item label='Male' value='male' />
          <Picker.Item label='Female' value='female' />
        </Picker>
        <View style={{ width: vw(90), borderColor: GRAY_LIGHT, borderBottomWidth: 1 }} />
      </View>
    )
  }
}