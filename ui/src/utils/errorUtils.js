import strings from '../strings';
const { errs } = strings;

export default ({
  toNotification: (err) => {
    const code = err.message.replace('GraphQL error: ', '');
    if (err.networkError) {
      return { title: errs.title, body: errs.network };
    } else if (code === 'USER_NOT_FOUND') {
      return { title: errs.title, body: errs.userNotFound };
    } else if (code === 'USER_AUTH_FAIL') {
      return { title: errs.title, body: errs.invalidCredentials };
    }  else if (code === 'USER_EXISTS') {
      return { title: errs.title, body: errs.emailExists };
    } else {
      throw err;
    }
  },
});
