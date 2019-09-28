import React from 'react';
import PropTypes from 'prop-types';
import Subsection from '../../components/Section/Subsection';
import OneColumn from '../../components/Section/OneColumn';
import { orange } from '../../components/Base/constants';
import ButtonWrapper from '../../components/Base/Button';
import Section from '../../components/Section/Section';
import LinkWrapper from '../../components/Base/Link';

function RegisterSubsection(props) {
  const loginInputIcon = iconName => (
    <i
      className="ui icon"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 4px',
        color: 'orange',
      }}
    >
      <i
        className={`${iconName} icon`}
        style={{ color: orange, fontSize: '18px', margin: '0 6px' }}
      />
      <span style={{ color: '#ccc', margin: '2px' }}>|</span>
    </i>
  );

  return (
    <Section>
      <Subsection id="register-wrapper">
        <h3>Welcome to HomeNeeds!</h3>
        <h4>The new way to design your Home</h4>
        <Subsection id="register-form">
          <form method="POST" {...props.form}>
            <OneColumn>
              <div className="ui left icon input fluid">
                <input
                  name="username"
                  type="email"
                  placeholder="Email"
                  required
                />
                {loginInputIcon('user circle outline')}
              </div>
            </OneColumn>
            <OneColumn>
              <div className="ui left icon input fluid">
                <input name="name" type="text" placeholder="Name" required />
                {loginInputIcon('user circle outline')}
              </div>
            </OneColumn>
            <OneColumn>
              <div className="ui left icon input fluid">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  minLength={8}
                  maxLength={16}
                />
                {loginInputIcon('unlock alternate')}
              </div>
            </OneColumn>
            <OneColumn>
              <div className="ui left icon input fluid">
                <input
                  name="phone"
                  type="phone"
                  placeholder="Phone"
                  required
                  minLength={8}
                  maxLength={16}
                />
                {loginInputIcon('phone')}
              </div>
            </OneColumn>
            <OneColumn>
              <ButtonWrapper design="filled">Sign Up</ButtonWrapper>
            </OneColumn>
          </form>
        </Subsection>
        <Subsection id="form-footer">
          <OneColumn>
            <div className="ui horizontal divider header">
              <span>Already have account?</span>
            </div>
            <LinkWrapper to="/login">
              <ButtonWrapper design="outline">Sign In</ButtonWrapper>
            </LinkWrapper>
          </OneColumn>
          <div className="ui divider" />
          <Subsection id="sign-up-tos">
            <p style={{ textAlign: 'left' }}>
              By signing up, signing in or continuing, I agree to HomeNeed{"'"}s{' '}
              <LinkWrapper to="/terms-of-use">Terms of Use</LinkWrapper> and{' '}
              <LinkWrapper to="/privacy-policy">Privacy Policy</LinkWrapper>
            </p>
          </Subsection>
        </Subsection>
      </Subsection>
    </Section>
  );
}

RegisterSubsection.propTypes = {
  form: PropTypes.object,
  // onSearchChange: PropTypes.func,
};

export default RegisterSubsection;
