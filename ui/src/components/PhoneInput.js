import React from 'react';
import { string, func } from 'prop-types';
import { StyleSheet, TextInput, Platform } from 'react-native';
import { colors } from '../theme';
import { Row, Text3 } from './index';
import { COUNTRIES } from 'constants';
import DeviceInfo from 'react-native-device-info';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';

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
    color: colors.primary,
  },
});

export default class PhoneInput extends React.Component {

  static propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
    onSubmit: func.isRequired,
  }

  constructor(props) {
    super(props);
    let userLocaleCountryCode = DeviceInfo.getDeviceCountry();
    const userCountryData = getAllCountries()
      .filter(country => COUNTRIES.includes(country.cca2))
      .filter(country => country.cca2 === userLocaleCountryCode)
      .pop();
    let cc = null;
    let cca2 = userLocaleCountryCode;
    if (!cca2 || !userCountryData) {
      cca2 = 'IN';
      cc = '91';
    } else {
      cc = userCountryData.callingCode;
    }
    this.state = {
      cca2,
      cc,
    };
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
    const { value, onChange, onSubmit } = this.props;
    return (
      <Row align="center" marginTop={30}>
        <Row marginLeft={10} marginRight={10}>
          <CountryPicker style={styles.countryPicker} countryList={COUNTRIES} cca2={cca2} translation="eng" onChange={this.setCountry} closeable />
        </Row>
        <Row marginRight={10}>
          <Text3 fontWeight="bold" color={colors.primary} value={`+${cc}`} />
        </Row>
        <TextInput ref={this.sefInputRef} name='phoneNumber' type='TextInput' underlineColorAndroid='transparent'
          autoCapitalize='none' autoCorrect={false} onChangeText={this.setText}
          placeholder='Phone Number' keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          style={styles.phone} value={value}
          returnKeyType='go' autoFocus placeholderTextColor={colors.primary}
          selectionColor={colors.primary} maxLength={cca2 === 'IN' ? 10 : 15} onSubmitEditing={onSubmit} />
      </Row>
    );
  }
}