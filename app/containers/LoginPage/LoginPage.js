import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Grid, Menu } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TemplatePage from '../Common/PageWrapper';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
import LoginSubsection from './LoginSubsection';
import SocialLoginSubsection from './SocialLoginSubsection';
import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import { DAEMON } from '../../utils/constants';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import './styles.css';

const mapDispatchToProps = dispatch => ({
  login: payload => {
    dispatch({ type: USERS.LOGIN.REQUESTED, payload });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  users: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: USERS.MODEL, reducer });
const withSaga = injectSaga({
  key: USERS.MODEL,
  saga,
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class LoginPage extends React.PureComponent {
  static propTypes = {
    login: PropTypes.func.isRequired,
    users: PropTypes.object,
    location: PropTypes.object,
    goTo: PropTypes.func,
  };
  state = { userType: 'consumer', openError: false, errorMessage: '' };

  loginWithEmail = event => {
    event.preventDefault();
    this.props.login({
      method: 'email',
      username: event.target.username.value,
      password: event.target.password.value,
      user_type: this.state.userType,
    });
  };

  render() {
    const { login } = this.props;
    const { openError, errorMessage } = this.state;
    return (
      <TemplatePage {...this.props}>
        <TwoColumn id="content">
          <Grid.Column>
            <Subsection id="login-section">
              <PaperWrapper>
                <Menu pointing secondary fluid id="user-type-menu">
                  <Menu.Item
                    name="consumer"
                    onClick={() => {
                      this.setState({ userType: 'consumer' });
                    }}
                    active={this.state.userType === 'consumer'}
                  >
                    Looking for a Professional
                  </Menu.Item>
                  <Menu.Item
                    name="merchant"
                    onClick={() => {
                      this.setState({ userType: 'merchant' });
                    }}
                    active={this.state.userType === 'merchant'}
                  >
                    I am a Professional
                  </Menu.Item>
                </Menu>
                <LoginSubsection
                  form={{
                    onSubmit: this.loginWithEmail,
                  }}
                  error={openError ? errorMessage : ''}
                  userType={this.state.userType}
                />
                {/* {openError && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
              </PaperWrapper>
            </Subsection>
          </Grid.Column>
          <Grid.Column>
            <Subsection id="social-login-section">
              <SocialLoginSubsection
                login={login}
                user_type={this.state.userType}
              />
            </Subsection>
          </Grid.Column>
        </TwoColumn>
      </TemplatePage>
    );
  }
  componentDidMount() {
    const { goTo, users, location } = this.props;
    if (users.isLoggedIn) {
      if (
        location.search &&
        queryString.parse(location.search).redirect !== undefined
      ) {
        // console.log(queryString.parse(location.search));
        goTo({ path: queryString.parse(location.search).redirect });
      } else {
        goTo({ path: '/dashboard' });
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { location, goTo, users } = this.props;
    if (
      prevProps.users.loginError.message !== users.loginError.message &&
      users.loginError.message
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        openError: true,
        errorMessage: users.loginError.message,
      });
    }
    if (!prevProps.users.isLoggedIn && users.isLoggedIn) {
      if (
        location.search &&
        queryString.parse(location.search).redirect !== undefined
      ) {
        goTo({ path: queryString.parse(location.search).redirect });
      } 
      else if (location.state && location.state.includes('professionals')) {
        goTo({ path: location.state });
      }
      else {
        goTo({ path: '/dashboard' });
      }
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);

// export default LoginPage;
