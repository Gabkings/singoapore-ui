import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export default class SubPageContent extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}
