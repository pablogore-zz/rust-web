import React from 'react';
import { string, func } from 'prop-types';
import { StyleSheet, TextInput, Platform } from 'react-native';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import { Row, Text3 } from './index';
import { COUNTRIES } from '../constants';
import { PRIMARY } from '../colors';

const styles = StyleSheet.create({
  countryPicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  phone: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontSize: 20,
    color: PRIMARY,
  },
});

export default class PhoneInput extends React.Component {

  static propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
  }

  state = {
    cca2: 'IN',
    cc: '91',
  }

  setCountry = (v) => {
    this.setState({ cca2: v.cca2, cc: v.callingCode });
    this.inputRef.focus();
  }

  sefInputRef = (ref) => {
    this.inputRef = ref;
  }

  setText = (v) => {
    this.props.onChange(this.state.cca2, this.state.cc, v);
  }

  render() {
    const { cca2, cc } = this.state;
    const { value, onChange } = this.props;
    return (
      <Row align="center" marginTop={30}>
        <Row marginLeft={40} marginRight={10}>
          <CountryPicker style={styles.countryPicker} countryList={COUNTRIES} cca2={cca2} translation="eng" onChange={this.setCountry} closeable />
        </Row>
        <Row marginRight={10}>
          <Text3 fontWeight="bold" color={PRIMARY} value={`+${cc}`} />
        </Row>
        <TextInput ref={this.sefInputRef} name='phoneNumber' type='TextInput' underlineColorAndroid='transparent'
          autoCapitalize='none' autoCorrect={false} onChangeText={this.setText}
          placeholder='Phone Number' keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          style={styles.phone} value={value}
          returnKeyType='go' autoFocus placeholderTextColor={PRIMARY}
          selectionColor={PRIMARY} maxLength={cca2 === 'IN' ? 10 : 15} />
      </Row>
    );
  }
}