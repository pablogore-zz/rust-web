import { Dimensions, StatusBar } from 'react-native';

export const vw = percentageWidth => Dimensions.get('window').width * (percentageWidth / 100);

export const vh = (percentageHeight) => {
  if (StatusBar.currentHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100) - StatusBar.currentHeight;
  }
  return Dimensions.get('window').height * (percentageHeight / 100);
};
