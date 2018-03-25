import React from 'react';
import { shape, string, arrayOf } from 'prop-types';
import { Text4 } from './index';
import { colors } from 'theme';

export default class ErrorBox extends React.Component {

  static propTypes = {
    error: shape({
      graphQLErrors: arrayOf(shape({
        message: string,
      })),
      message: string,
    }),
  }

  render() {
    const { error } = this.props;
    let message = '';
    if (error.graphQLErrors.length > 0) {
      message = error.graphQLErrors[0].message;
    } else if (error.message.indexOf('Network') > -1) {
      message = 'Please check your network connection';
    } else {
      message = 'Oops.. Something went wrong';
    }
    return (
      <Text4 color={colors.red} value={message} />
    );
  }
}
