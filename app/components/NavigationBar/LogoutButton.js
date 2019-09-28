import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import ButtonWrapper from '../Base/Button';

function LogoutButton(props) {
  return (
    <div id="logout-button">
      <ButtonWrapper design="outline" onClick={props.onClick}>
        <Icon style={{ margin: '4px' }} className="sign-out" /> |{' '}
        <span style={{ margin: '4px' }}>Log Out</span>
      </ButtonWrapper>
    </div>
  );
}

LogoutButton.propTypes = {
  onClick: PropTypes.func,
};

export default LogoutButton;
