import { Dimensions, StatusBar } from 'react-native';

export const vw = percentageWidth => Dimensions.get('window').width * (percentageWidth / 100);

export const vh = (percentageHeight) => {
  if (StatusBar.currentHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100) - StatusBar.currentHeight;
  }
  return Dimensions.get('window').height * (percentageHeight / 100);
};


export const colors = {
  primary: '#41C97A',
  gray: '#A9A9A9',
  borderGray: '#A9A9A9',
  textLogoGray: '#4C4C4C',
  textGray: '#B2B2B2',
  textGrayBold: '#535353',
  textGreenBold: '#21C064',
  background: '#3A4149',
  addButtonBg: '#21BE63',
  tabBarBg: '#252525',
  tabBarActive: '#FFFFFF',
  tabBarInActive: '#8E8E8E',
  icon: '#3B7984',
  iconGray: '#B2B2B2',
  white: '#FFFFFF',
  black: '#000000',
  transparent: '#FFFFFF00',
  buttonGreen: '#1EC65E',
  buttonBlue: '#473EFE',
  buttonRegisterBlue: '#5F9AE7',
  pageBackground: '#FFFFFFE8',
  darkBgColor: '#000000AA',
  scopeBar: '#475260',
  red: '#FF0000',
  fb: '#3b5998',
  settingTitle: '#21BE63',
  buttonGroupText: '#7F7F7F',
  buttonGroupBg: '#EDEDED',
  buttonGroupSelected: '#1EC85F',
  scrollingMenuBg: '#EDEDED',
  scrollingMenuText: '#7F7F7F',
  scrollingMenuSelected: '#1EC85F',
};
