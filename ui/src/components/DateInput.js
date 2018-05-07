import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { string, func } from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DateText from './DateText';
import { GRAY_LIGHT } from '../colors';
import { vw } from '../utils/window';

export default class DateInput extends React.Component {

  static propTypes = {
    value: string,
    onChange: func,
  }

  state = {
    visible: false,
  }

  showPicker = () => {
    this.setState({ visible: true });
  }

  hidePicker = () => {
    this.setState({ visible: false });
  }

  render() {
    const { value, onChange } = this.props;
    const { visible } = this.state;
    return (
      <TouchableOpacity onPress={this.showPicker}>
        <DateText value={value} />
        <DateTimePicker isVisible={visible} onConfirm={(v) => onChange(v.toISOString())} onCancel={this.hidePicker} />
        <View style={{ marginTop: 10, width: vw(90), borderColor: GRAY_LIGHT, borderBottomWidth: 1 }} />
      </TouchableOpacity>
    );
  }
}
