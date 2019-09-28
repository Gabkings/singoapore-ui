import React from 'react';
import PropTypes from 'prop-types';
import './label.css';
function Label(props) {
  return (
    <div
      className="label"
      style={{
        borderColor: props.color,
        color: props.color,
      }}
    >
      {props.children}
    </div>
  );
}

Label.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
};

export default Label;
