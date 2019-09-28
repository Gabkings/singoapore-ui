import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import ButtonWrapper from '../Base/Button';
// import Login from '../../images/login.png';
import { getS3Image } from '../../utils/images';

const Login = getS3Image('/images/login.png');

function LoginButton(props) {
  return (
    <span id="login-button">
      <ButtonWrapper design="outline" onClick={props.onClick}>
        <Image src={Login} />&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Log in
      </ButtonWrapper>
    </span>
  );
}

LoginButton.propTypes = {
  onClick: PropTypes.func,
};

export default LoginButton;
