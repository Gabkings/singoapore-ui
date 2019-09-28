import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Menu, Modal, Segment } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TemplatePage from '../Common/PageWrapper';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
import RegisterSubsection from './RegisterSubsection';
import SocialLoginSubsection from '../LoginPage/SocialLoginSubsection';
import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import { DAEMON } from '../../utils/constants';

import './styles.css';

const mapDispatchToProps = dispatch => ({
  register: payload => {
    dispatch({ type: USERS.REGISTER.REQUESTED, payload });
  },
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
class RegisterPage extends React.PureComponent {
  static propTypes = {
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    users: PropTypes.object,
    goTo: PropTypes.func,
    location: PropTypes.object,
  };
  state = { openError: false, errorMessage: '', openActivation: false };
  render() {
    const { register, goTo } = this.props;
    const { openError, errorMessage, openActivation } = this.state;
    return (
      <TemplatePage {...this.props}>
        <TwoColumn id="content">
          <Grid.Column>
            <Subsection id="register-section">
              <PaperWrapper>
                <Menu pointing secondary fluid id="user-type-menu">
                  <Menu.Item name="consumer" active onClick={() => {}}>
                    Looking for a Professional
                  </Menu.Item>
                  <Menu.Item
                    name="merchant"
                    onClick={() => {
                      goTo({ path: '/register-merchant' });
                    }}
                  >
                    I am a Professional
                  </Menu.Item>
                </Menu>
                <Modal
                  onClose={() => {
                    this.setState({ openError: false });
                  }}
                  open={openError}
                >
                  <Segment id="login-fail">
                    <Header>Register Failed</Header>
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                  </Segment>
                </Modal>
                <Modal
                  onClose={() => {
                    this.setState({ openActivation: false });
                  }}
                  open={openActivation}
                >
                  <Segment id="login-fail">
                    <Header>Register Success</Header>
                    <p>
                      An Activation Email has been sent to your email. Please
                      check your spam box too.
                    </p>
                  </Segment>
                </Modal>
                <RegisterSubsection
                  form={{
                    onSubmit: event => {
                      event.preventDefault();
                      register({
                        email: event.target.username.value,
                        password: event.target.password.value,
                        name: event.target.name.value,
                        phone: event.target.phone.value,
                        method: 'email',
                        user_type: 'consumer',
                      });
                    },
                  }}
                />
              </PaperWrapper>
            </Subsection>
          </Grid.Column>
          <Grid.Column>
            <Subsection id="social-login-section">
              <SocialLoginSubsection login={register} user_type="consumer" />
            </Subsection>
          </Grid.Column>
        </TwoColumn>
      </TemplatePage>
    );
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { users } = this.props;
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
    if (
      prevProps.users.REGISTER.id !== users.REGISTER.id &&
      users.REGISTER.method === 'email'
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        openActivation: true,
      });
    }
    if (!prevProps.users.isLoggedIn && this.props.users.isLoggedIn) {
      if (
        this.props.location.query &&
        this.props.location.query.redirect !== undefined
      ) {
        this.props.goTo(this.props.location.query.redirect);
      } else {
        this.props.goTo({ path: '/dashboard' });
      }
    }
    if (this.props.users.isLoggedIn) {
      if (
        this.props.location.query &&
        this.props.location.query.redirect !== undefined
      ) {
        this.props.goTo(this.props.location.query.redirect);
      } else {
        this.props.goTo({ path: '/dashboard' });
      }
    }
  }
}

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterPage);

// export default RegisterPage;
