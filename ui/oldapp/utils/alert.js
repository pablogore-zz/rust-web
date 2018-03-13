import { Platform, Alert } from 'react-native';

export default Platform.select({
  web: {
    alert(title, message) {
      alert(message);
    },
  },
  android: {
    alert(title, message) {
      Alert.alert(title, message);
    },
  },
  ios: {
    alert(title, message) {
      Alert.alert(title, message);
    },
  },
}).alert;
