import { Platform } from 'react-native';
const env = process.env.NODE_ENV;

export default ({
  dev: env === 'development',
  uri: env === 'development' ? 'http://localhost:8000/graphql' : 'http://35.186.152.198:3000/graphql',
});
