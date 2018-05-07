import React from 'react';
import moment from 'moment';
import { withApollo } from 'react-apollo';
import { Text3, Text5, ScreenFull, Icon, Header, Row, Col, Button, ScrollView, TextInput, DateInput, GenderInput } from '../components';
import storageUtils from '../utils/storage';
import { vw } from '../utils/window';
import { user } from '../queries/user';
import { WHITE } from '../colors';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: constants.fontSizeNormal,
//     color: colors.textGray,
//     marginTop: 5,
//   },
//   inputTitleText: {
//     fontSize: constants.fontSizeSmaller,
//     color: colors.textGray,
//     textAlign: 'left',
//   },
//   headerButton: {
//     padding: 20,
//   },
//   headerRightText: {
//     fontSize: constants.fontSizeNormal,
//     fontWeight: constants.fontWeightBold,
//     color: colors.white,
//   },
// })

class ProfileScreen extends React.Component {

  static navigationOptions = () => ({
    header: <Header />,
    tabBarLabel: <Text5 value="Profile" color={WHITE} />,
    tabBarIcon: ({ tintColor }) => <Icon name="user" height="24" width="24" fill={tintColor} />,
    tabBarVisible: true,
  });

  state = {
    name: '',
    email: '',
    birthday: moment().toISOString(),
    gender: '',
    location: '',
    address: '',
    pincode: '',
  }

  setName = (v) => {
    this.setState({ name: v });
  }

  setEmail = (v) => {
    this.setState({ email: v });
  }

  setBirthday = (v) => {
    this.setState({ birthday: v });
  }

  setGender = (v) => {
    this.setState({ gender: v });
  }

  setLocation = (v) => {
    this.setState({ location: v });
  }

  setAddress = (v) => {
    this.setState({ address: v });
  }

  setPincode = (v) => {
    this.setState({ pincode: v });
  }

  onSignOutClicked = async () => {
    await storageUtils.set('token', '');
    await this.props.client.resetStore();
    this.props.navigation.navigate('SplashScreen');
  }

  render() {
    const { name, email, birthday, gender, location, address, pincode } = this.state;
    return (
      <ScreenFull>
        <ScrollView style={{ flex: 1 }}>
          <Col flex={1} justify="flex-start" align="center">
            <Col flex={1} justify="flex-start" align="flex-start" marginTop={20}>
              {/* <TouchableOpacity onPress={() => this.onImagePicked(auth)} style={{ flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <AvatarImage firstName={first_name} lastName={last_name} imageUrl={profile_image.url} />
                <Text style={styles.text}>{strings.updateProfile.addPhoto}</Text>
              </TouchableOpacity> */}
              <Col marginTop={20}>
                <Text5 value={"FULL NAME"} />
                <TextInput width={vw(90)} height={40} value={name} onChange={this.setName} />
              </Col>
              <Col marginTop={20}>
                <Text5 value={"EMAIL"} />
                <TextInput width={vw(90)} height={40} value={email} onChange={this.setEmail} />
              </Col>
              <Col marginTop={20}>
                <Text5 value={"BIRTHDAY"} />
                <DateInput value={birthday} onChange={this.setBirthday} />
              </Col>
              <Col marginTop={20}>
                <Text5 value={"GENDER"} />
                <GenderInput value={gender} onChange={this.setGender} />
              </Col>
              <Col marginTop={20}>
                <Text5 value={"LOCATION"} />
                <TextInput width={vw(90)} height={40} value={location} onChange={this.setLocation} />
              </Col>
              <Col marginTop={20}>
                <Text5 value={"ADDRESS"} />
                <TextInput width={vw(90)} height={40} value={address} onChange={this.setAddress} />
              </Col>
              <Col marginTop={20}>
                <Text5 value={"PINCODE"} />
                <TextInput width={vw(90)} height={40} value={pincode} onChange={this.setPincode} />
              </Col>
              <Col marginTop={40} marginBottom={40}>
                <Button value="Sign Out" onClicked={() => this.onSignOutClicked()} />
              </Col>
            </Col>
          </Col>
        </ScrollView>
      </ScreenFull>
    );
  }
}

export default withApollo(ProfileScreen);

// import React from 'react'
// import { StyleSheet, Platform, View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity, Picker } from 'react-native'
// import DateTimePicker from 'react-native-modal-datetime-picker'
// import { ImagePicker } from 'expo'
// import moment from 'moment'

// import AvatarImage from '../components/AvatarImage'
// import ProgressDialog from '../components/ProgressDialog'
// import Margin from '../components/Margin'
// import Input from '../components/Input'
// import strings from '../strings'
// import req from '../req'
// import dialogs from '../utils/dialogs'
// import { base, constants, colors, vw, vh } from '../theme'

// class UpdateProfileScreen extends React.Component {

//   static navigationOptions = ({ navigation }) => ({
//     title: strings.header.editProfile,
//     headerBackTitleStyle: {
//       color: colors.white,
//     },
//     headerTintColor: colors.white,
//     headerRight: (
//       <TouchableOpacity style={styles.headerButton} onPress={() => navigation.state.params.onSaveClicked(navigation)}>
//         <Text style={styles.headerRightText}>
//           {strings.header.save}
//         </Text>
//       </TouchableOpacity>
//     ),
//     headerStyle: {
//       backgroundColor: colors.primary,
//     },
//     headerTitleStyle: {
//       color: colors.white,
//     },
//   })

//   state = {
//     isDateTimePickerVisible: false,
//   }

//   componentDidMount() {
//     this.setState({ isDateTimePickerVisible: false });
//   }

//   showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

//   hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

//   onDatePicked = (auth, date) => {
//     auth.updateBirthday(moment(date.toISOString()).format(constants.birthdayFormat));
//     this.hideDateTimePicker()
//   };

//   onImagePicked = async (auth) => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//     })
//     if (!result.cancelled) {
//       auth.updateImage(result.uri);
//     }
//   }

//   render() {
//     return (
//       <Subscribe to={[AuthContainer]}>
//         {(auth) => {
//           const { first_name, last_name, email, birthday, gender, profile_image, isDateTimePickerVisible } = auth.state.user;
//           return (
//           );
//         }}
//       </Subscribe>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   headerButton: {
//     padding: 20,
//   },
//   imageStyle: {
//     marginLeft: 15,
//     marginRight: 20,
//     alignSelf: 'center',
//     width: 36,
//     height: 40,
//     justifyContent: 'center'
//   },
//   titleStyle: {
//     color: colors.settingTitle,
//     marginBottom: 10,
//     fontWeight: '500'
//   },
//   itemStyle: {
//     fontSize: constants.fontSizeNormal,
//     color: colors.black,
//   },
//   itemWarningStyle: {
//     fontSize: constants.fontSizeNormal,
//     color: colors.red,
//   },
// })
{/* <View style={{ backgroundColor: '#f6f6f6', flex: 1 }}>
<SettingsList borderColor='#d6d5d9' defaultItemSize={50}>
  <SettingsList.Item hasNavArrow={false} title={strings.settings.connect} titleStyle={styles.titleStyle} itemWidth={50} borderHide='Both' />
  <SettingsList.Item hasNavArrow={false} title={strings.settings.facebook} titleStyle={styles.itemStyle} itemWidth={70}
    hasSwitch={true} switchState={false} switchOnValueChange={adventure.onConnectClicked} switchProps={switchProps}
    icon={
      <View style={styles.imageStyle}>
        <FontAwesome name='facebook-square' size={36} color={colors.fb} />
      </View>
    }
  />
  <SettingsList.Header headerStyle={{ marginTop: -5 }} />
  <SettingsList.Item hasNavArrow={false} title={strings.settings.notification} titleStyle={styles.titleStyle} itemWidth={50} borderHide='Both' />
  <SettingsList.Item hasNavArrow={false} title={strings.settings.pushNotifications} titleStyle={styles.itemStyle} itemWidth={70}
    hasSwitch={true} switchState={true} switchOnValueChange={adventure.onPushNotificationsClicked} switchProps={switchProps}
    icon={
      <View style={styles.imageStyle}>
        <FontAwesome name='bell-o' size={30} color={colors.settingTitle} />
      </View>
    }
  />
  <SettingsList.Header headerStyle={{ marginTop: -5 }} />
  <SettingsList.Item hasNavArrow={false} title={strings.settings.account} titleStyle={styles.titleStyle} itemWidth={50} borderHide='Both' />
  <SettingsList.Item hasNavArrow={false} title={strings.settings.editProfile} titleStyle={styles.itemStyle} itemWidth={70}
    onPress={auth.onEditClicked} icon={
      <View style={styles.imageStyle}>
        <FontAwesome name='user-o' size={30} color={colors.settingTitle} />
      </View>
    }
  />
  <SettingsList.Item hasNavArrow={false} title={strings.settings.privateAccount} titleStyle={styles.itemStyle} itemWidth={70}
    hasSwitch={true} switchState={adventure.state.selectedUser.private} switchOnValueChange={adventure.onPrivateAccountClicked} switchProps={switchProps}
    icon={
      <View style={styles.imageStyle}>
        <FontAwesome name='user-secret' size={30} color={colors.settingTitle} />
      </View>
    }
  />
  <SettingsList.Item hasNavArrow={false} title={strings.settings.blocked} titleStyle={styles.itemStyle} itemWidth={70}
    onPress={adventure.onBlockedClicked}
    icon={
      <View style={styles.imageStyle}>
        <FontAwesome name='ban' size={30} color={colors.settingTitle} />
      </View>
    }
  />
  <SettingsList.Item hasNavArrow={false} title={strings.settings.terms} titleStyle={styles.itemStyle} itemWidth={70}
    onPress={adventure.onTermsClicked}
    icon={
      <View style={styles.imageStyle}>
        <FontAwesome name='info-circle' size={30} color={colors.settingTitle} />
      </View>
    }
  />
  <SettingsList.Item hasNavArrow={false} title={strings.settings.privacyPolicy} titleStyle={styles.itemStyle} itemWidth={70}
    onPress={adventure.onPrivacyPolicyClicked} icon={
      <View style={styles.imageStyle}>
        <FontAwesome name='lock' size={30} color={colors.settingTitle} />
      </View>
    }
  />
  <SettingsList.Header headerStyle={{ marginTop: -5 }} />
  <SettingsList.Item hasNavArrow={false} title={strings.settings.logout} titleStyle={styles.itemStyle} itemWidth={70}
    onPress={adventure.onLogoutClicked}
    icon={
      <View style={styles.imageStyle}>
        <FontAwesome name='sign-out' size={30} color={colors.black} />
      </View>
    }
  />
  <SettingsList.Item hasNavArrow={false} title={strings.settings.deleteAccount} titleStyle={styles.itemWarningStyle} itemWidth={70}
    onPress={adventure.onDeleteAccountClicked}
    icon={
      <View style={styles.imageStyle}>
        <FontAwesome name='trash-o' size={30} color={colors.red} />
      </View>
    }
  />
</SettingsList>
</View> */}