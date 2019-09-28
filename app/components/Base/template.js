import React from 'react';
import PropTypes from 'prop-types';

function Image(props) {
  return <img {...props} alt="a" />;
}

Image.propTypes = {
  classes: PropTypes.object.isRequired,
  onTextChange: PropTypes.func,
};

export default Image;
