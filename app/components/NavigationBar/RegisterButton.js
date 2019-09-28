import React from 'react';
import PropTypes from 'prop-types';
import ButtonWrapper from '../Base/Button';

function RegisterButton(props) {
  return (
    <span id="register-button">
      <ButtonWrapper design="filled" onClick={props.onClick}>
        {['Sign up']}
      </ButtonWrapper>
    </span>
  );
}

RegisterButton.propTypes = {
  onClick: PropTypes.func,
};

export default RegisterButton;
