/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Subsection from '../../components/Section/Subsection';
import OneColumn from '../../components/Section/OneColumn';
import Section from '../../components/Section/Section';
import './social-styles.css';
import GoogleLogo from './GoogleLogo';

function SocialLoginSubsection(props) {
  const loginWithGoogle = resp => {
    props.login({
      method: 'google',
      username: resp.profileObj.email,
      token: resp.tokenId,
      user_type: props.user_type,
    });
  };

  const loginWithFacebook = resp => {
    props.login({
      method: 'facebook',
      username: resp.email,
      token: resp.accessToken,
      user_type: props.user_type,
    });
  };

  return (
    <Section>
      <Subsection id="social-login-wrapper">
        <h3>You can also continue with</h3>
        <OneColumn>
          <FacebookLogin
            appId="942418015912160"
            fields="name,email,picture"
            callback={response => {
              loginWithFacebook(response);
            }}
            onFailure={error => {
              console.error(error);
            }}
            responseType="token"
            render={renderProps => (
              <button
                onClick={renderProps.onClick}
                className="social-login-button facebook-login"
              >
                <i className="ui big icon facebook f social-logo" />
                <div className="button-text">Continue with Facebook</div>
              </button>
            )}
          />
        </OneColumn>
        <OneColumn>
          <GoogleLogin
            className="social-login-button google-login"
            clientId="1009692542035-qkadnpoijsrjejokje8luh2lrbdis3me.apps.googleusercontent.com"
            onSuccess={response => {
              loginWithGoogle(response);
            }}
            onFailure={error => {
              console.error(error);
            }}
          >
            <GoogleLogo
              className="social-logo"
              style={{ width: '29px', height: '29px' }}
            />
            <div className="button-text">Continue with Google</div>
          </GoogleLogin>
        </OneColumn>
      </Subsection>
    </Section>
  );
}

SocialLoginSubsection.propTypes = {
  login: PropTypes.func,
  user_type: PropTypes.string,
};

export default SocialLoginSubsection;
