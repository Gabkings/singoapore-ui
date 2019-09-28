import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function MaterialTextField(props) {
  return <TextField onChange={props.onTextChange} />;
}

MaterialTextField.propTypes = {
  onTextChange: PropTypes.func,
};

export default MaterialTextField;
