import React from 'react';
import { string } from 'prop-types';
import moment from 'moment';
import Text from './Text';
import { BLACK } from '../colors';

export default class DateText extends React.Component {

  static propTypes = {
    format: string,
    ...Text.propTypes
  }

  static defaultProps = {
    format: "DD MMM YYYY",
    fontSize: 16,
    color: BLACK,
  }

  render() {
    const { value, format, ...otherProps } = this.props;
    const date = moment(value).format(format);
    return <Text value={date} {...otherProps} />
  }
}

// birthdayFormat: 'MM/DD/YYYY',