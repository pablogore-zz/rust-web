import { Platform } from 'react-native';
const env = process.env.NODE_ENV;

export default ({
  dev: env === 'development',
  uri: env === 'development' ? 'http://localhost:8000/graphql' : 'http://162.221.195.240/graphql',
});
