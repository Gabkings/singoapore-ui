import React from 'react';
import PropTypes from 'prop-types';

function TextInput(props) {
  return (
    <div className="ui input">
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={props.onTextChange}
      />
    </div>
  );
}

TextInput.propTypes = {
  placeholder: PropTypes.string,
  onTextChange: PropTypes.func,
};

export default TextInput;
