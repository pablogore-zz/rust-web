import { Platform, Alert } from 'react-native';

export default {
  alert: (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(title, message);
    } else {
      Alert.alert(title, message);
    }
  },
};
