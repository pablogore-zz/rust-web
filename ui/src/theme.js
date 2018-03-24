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

export const constants = {
  fontSizeNormal: 16,
  fontSizeLarge: 18,
  fontSizeLarger: 20,
  fontSizeLargest: 22,
  fontSizeSmall: 14,
  fontSizeSmaller: 12,
  fontSizeSmallest: 10,
  fontWeightBold: 'bold',
  addButtonRadius: 25,
  birthdayFormat: 'MM/DD/YYYY',
  birthdayDisplayFormat: 'DD MMM YYYY',
};

export const base = {
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  vertical: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  centerColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalText: {
    fontSize: constants.fontSizeNormal,
    fontWeight: 'normal',
    textAlign: 'center',
    color: colors.black,
  },
  largeText: {
    fontSize: constants.fontSizeLarge,
    fontWeight: 'normal',
    textAlign: 'center',
    color: colors.black,
  },
  lightText: {
    fontSize: constants.fontSizeSmall,
    fontWeight: 'normal',
    textAlign: 'center',
    color: colors.textGray,
  },
  boldText: {
    fontSize: constants.fontSizeLarge,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.textGrayBold,
  },
  boldGreenText: {
    fontSize: constants.fontSizeLarge,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.textGreenBold,
  },
  link: {
    color: colors.buttonRegisterBlue,
    textDecorationLine: 'underline',
  },
  tabLabel: {
    fontSize: 12,
    color: colors.white,
    marginTop: 8,
  },
};
