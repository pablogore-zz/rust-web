import config from '../config';

export default {
  info(...params) {
    if (config.dev) {
      console.log(...params);
    }
  }
};