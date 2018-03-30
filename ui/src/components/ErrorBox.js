import React from 'react';
import { shape, string, arrayOf, oneOf } from 'prop-types';
import { Text4, Row } from './index';
import { RED } from 'colors';

export default class ErrorBox extends React.Component {

  static propTypes = {
    error: oneOf(string, shape({
      graphQLErrors: arrayOf(shape({
        message: string,
      })),
      message: string,
    })),
  }

  render() {
    const { error } = this.props;
    let message = '';
    console.log('error', error);
    if (typeof error === 'string' && error !== '') {
      message = error;
    } else if (error.graphQLErrors.length > 0) {
      message = error.graphQLErrors[0].message;
    } else if (error.message.indexOf('Network') > -1) {
      console.log('ads', JSON.stringify(error, 2, 2));
      message = "Please check your network connection";
    } else {
      message = "Oops.. Something went wrong";
    }
    return (
      <Row align="center" justify="center" marginTop={20}>
        <Text4 color={RED} value={message} />
      </Row>
    );
  }
}
