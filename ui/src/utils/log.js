import config from '../config';

export const info = (...params) => {
  if (config.dev) {
    console.log(...params)
  }
}