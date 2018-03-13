import { Platform } from 'react-native';

const env = process.env.NODE_ENV;
const localEndpoint = Platform.OS === 'web' ? '/graphql' : 'http://localhost:3000/graphql';

export default ({
  env: env,
  uri: env === 'development' ? localEndpoint : 'http://35.186.152.198:3000/graphql',
  links: {
    termsOfUse: '',
    privacyPolicy: '',
  },
});
