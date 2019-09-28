import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export default class SubPageDescription extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    return (
      <div>
        <p>{this.props.children}</p>
      </div>
    );
  }
}
