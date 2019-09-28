import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function ButtonGroup(props) {
  return (
    <div
      className="ui compact menu button-group"
      style={{ borderRadius: '0px' }}
    >
      {props.buttons.map(buttonObject => (
        <button
          {...buttonObject}
          className={`link item ${buttonObject.className}`}
        >
          {buttonObject.children}
        </button>
      ))}
    </div>
  );
}

ButtonGroup.propTypes = {
  buttons: PropTypes.array.isRequired,
};

export default ButtonGroup;
