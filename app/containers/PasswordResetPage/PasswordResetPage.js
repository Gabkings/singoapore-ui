import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Modal } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TemplatePage from '../Common/PageWrapper';
import Subsection from '../../components/Section/Subsection';
import PaperWrapper from '../../components/Base/Paper';
import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import { DAEMON } from '../../utils/constants';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import './styles.css';
import OneColumn from '../../components/Section/OneColumn';
import ButtonWrapper from '../../components/Base/Button';
import { orange } from '../../components/Base/constants';

const mapDispatchToProps = dispatch => ({
  passwordResetEmail: payload => {
    dispatch({ type: USERS.PASSWORD_RESET_EMAIL.REQUESTED, payload });
  },
  passwordResetSubmit: payload => {
    dispatch({ type: USERS.PASSWORD_RESET_SUBMIT.REQUESTED, payload });
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
class PasswordResetPage extends React.PureComponent {
  static propTypes = {
    passwordResetEmail: PropTypes.func.isRequired,
    passwordResetSubmit: PropTypes.func.isRequired,
    users: PropTypes.object,
    location: PropTypes.object,
    goTo: PropTypes.func,
  };
  state = {
    query: {},
    openPasswordResetSuccessModal: false,
    openEmailSentModal: false,
    openErrorModal: false,
  };

  render() {
    const { passwordResetEmail, passwordResetSubmit } = this.props;
    const {
      query,
      openPasswordResetSuccessModal,
      openEmailSentModal,
      openErrorModal,
    } = this.state;
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
      <TemplatePage {...this.props}>
        <Subsection
          style={{
            width: '300px',
            paddingTop: '200px',
            paddingBottom: '200px',
          }}
        >
          <PaperWrapper>
            <Subsection>
              {query.token === undefined && (
                <form
                  method="POST"
                  onSubmit={event => {
                    event.preventDefault();
                    passwordResetEmail({
                      data: {
                        username: event.target.username.value,
                      },
                    });
                  }}
                >
                  <OneColumn>
                    <h1>Enter your email to reset your password</h1>
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
                    <ButtonWrapper design="filled">
                      Send Password Reset Email
                    </ButtonWrapper>
                  </OneColumn>
                </form>
              )}
              <Modal
                open={openErrorModal}
                onClose={() => {
                  this.setState({ openErrorModal: false });
                }}
              >
                <Subsection>
                  <h1>Error:</h1>
                  <p>{this.props.users.PASSWORD_RESET_EMAIL.error}</p>
                </Subsection>
              </Modal>
              <Modal
                open={openEmailSentModal}
                onClose={() => {
                  this.setState({ openEmailSentModal: false });
                }}
              >
                <Subsection>
                  <h1>Email Sent</h1>
                  <p>Please check your email</p>
                </Subsection>
              </Modal>
              {query.token && (
                <form
                  method="POST"
                  onSubmit={event => {
                    event.preventDefault();
                    passwordResetSubmit({
                      data: {
                        username: query.user,
                        token: query.token,
                        password: event.target.password.value,
                      },
                    });
                  }}
                >
                  <OneColumn>
                    <h1>Set Your New Password</h1>
                    <p>
                      <strong>Username:</strong> {query.user}
                    </p>
                    <div className="ui left icon input fluid">
                      <input
                        name="password"
                        type="password"
                        placeholder="New Password"
                        required
                        minLength={8}
                        maxLength={16}
                      />
                      {loginInputIcon('unlock alternate')}
                    </div>
                  </OneColumn>
                  <OneColumn>
                    <ButtonWrapper design="filled">
                      Password Reset
                    </ButtonWrapper>
                  </OneColumn>
                </form>
              )}
              <Modal
                open={openPasswordResetSuccessModal}
                onClose={() => {
                  this.setState({ openPasswordResetSuccessModal: false });
                }}
              >
                <Subsection>
                  <h1>Password Reset Success</h1>
                  <p>
                    Please click <a href="/login">here</a> to login
                  </p>
                </Subsection>
              </Modal>
            </Subsection>
          </PaperWrapper>
        </Subsection>
      </TemplatePage>
    );
  }
  componentDidMount() {
    const { location } = this.props;
    const query = queryString.parse(location.search);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ query });
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { users } = this.props;
    if (
      prevProps.users.PASSWORD_RESET_EMAIL.msg !==
        users.PASSWORD_RESET_EMAIL.msg &&
      users.PASSWORD_RESET_EMAIL.msg
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ openEmailSentModal: true });
    }
    if (
      prevProps.users.PASSWORD_RESET_EMAIL.error !==
        users.PASSWORD_RESET_EMAIL.error &&
      users.PASSWORD_RESET_EMAIL.error
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        openErrorModal: true,
      });
    }
    if (
      prevProps.users.PASSWORD_RESET_SUBMIT.msg !==
        users.PASSWORD_RESET_SUBMIT.msg &&
      users.PASSWORD_RESET_SUBMIT.msg
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ openPasswordResetSuccessModal: true });
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(PasswordResetPage);

// export default PasswordResetPage;
