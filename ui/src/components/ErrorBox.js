import React from 'react';
import { shape, string, arrayOf, oneOf, func } from 'prop-types';
import { Text4, Col, IconButton } from './index';
import { RED, GRAY } from '../colors';

export default class ErrorBox extends React.Component {

  static propTypes = {
    retry: func,
    error: oneOf(string, shape({
      graphQLErrors: arrayOf(shape({
        message: string,
      })),
      message: string,
    })),
  }

  render() {
    const { error, retry } = this.props;
    let message = '';
    let color = RED;
    if (typeof error === 'string' && error !== '') {
      message = error;
    } else if (error.graphQLErrors.length > 0) {
      message = error.graphQLErrors[0].message;
    } else if (error.message.indexOf('Network') > -1) {
      message = "Please check your network connection";
      color = GRAY;
    } else {
      message = "Oops.. Something went wrong";
    }
    return (
      <Col align="center" justify="center" marginTop={20}>
        <Text4 color={color} value={message} />
        {retry && <Col align="center" justify="center" marginTop={10}>
          <IconButton name="refresh" width="30" height="30" fill={color} onClicked={retry} />
          <Col marginTop={10}>
            <Text4 color={color} value={'Click to Refresh'} />
          </Col>
        </Col>}
      </Col>
    );
  }
}
