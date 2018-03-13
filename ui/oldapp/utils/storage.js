import { AsyncStorage } from 'react-native';

export default ({
  get: async (key) => {
    const res = await AsyncStorage.getItem(key);
    return JSON.parse(res);
  },
  set: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
});
