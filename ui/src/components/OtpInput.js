import React from 'react';
import { string, func } from 'prop-types';
import { StyleSheet, TextInput, Platform } from 'react-native';
import { Row, Text3 } from 'components';
import { COUNTRIES } from 'constants';
import { PRIMARY } from 'colors';

const styles = StyleSheet.create({
  phone: {
    padding: 0,
    margin: 0,
    flex: 1,
    color: PRIMARY,
    height: 50,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Courier',
  },
});

export default class OtpInput extends React.Component {

  static propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
    onSubmit: func.isRequired,
  }

  setText = (v) => {
    this.props.onChange(v);
  }

  render() {
    const { value, onChange, onSubmit } = this.props;
    return (
      <Row align="center" marginTop={30}>
        <TextInput name='otp' type='TextInput' underlineColorAndroid='transparent'
          autoCapitalize='none' autoCorrect={false} onChangeText={this.setText}
          placeholder='_ _ _ _ _ _' keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          style={styles.phone} value={value}
          returnKeyType='go' autoFocus placeholderTextColor={PRIMARY}
          selectionColor={PRIMARY} maxLength={6} onSubmitEditing={onSubmit} />
      </Row>
    );
  }
}
