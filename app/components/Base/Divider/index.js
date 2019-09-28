import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
function Divider(props) {
  return <div className={`ui divider ${props.className}`} />;
}

Divider.propTypes = {
  className: PropTypes.string,
};

export default Divider;
