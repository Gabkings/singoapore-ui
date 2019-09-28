import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { USERS } from '../../actions/restApi';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../reducers/user';
import injectSaga from '../../utils/injectSaga';
import saga from '../../sagas/user';
import { DAEMON } from '../../utils/constants';
import { getToken } from '../../utils/localStorage';

const mapDispatchToProps = dispatch => ({
  load_auth: payload => {
    dispatch({
      type: USERS.LOAD_AUTH.REQUESTED,
      payload: { showSpinner: false, ...payload },
    });
  },
  logout: () => {
    dispatch({ type: USERS.LOGOUT.REQUESTED });
  },
});

const mapStateToProps = state => ({
  user: state.get(USERS.MODEL).toJS(),
});

const withUserReducer = injectReducer({ key: USERS.MODEL, reducer });
const withUserSaga = injectSaga({
  key: USERS.MODEL,
  saga,
  mode: DAEMON,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

/* eslint-disable react/prefer-stateless-function */
class AuthRoute extends React.Component {
  static propTypes = {
    component: PropTypes.func,
    load_auth: PropTypes.func,
    user: PropTypes.object,
    mustLogIn: PropTypes.bool,
    render: PropTypes.func,
    location: PropTypes.object,
    logout: PropTypes.func,
  };

  componentDidMount() {
    this.props.load_auth(getToken());
  }

  render() {
    const {
      component: Component,
      render,
      mustLogIn,
      user = {},
      location,
      ...otherProps
    } = this.props;
    if ((mustLogIn && user.isLoggedIn) || !mustLogIn) {
      if (Component)
        return (
          <Route
            {...otherProps}
            render={props => (
              <Component {...props} {...otherProps} user={user} />
            )}
          />
        );
      if (render)
        return (
          <Route
            {...otherProps}
            render={props => render({ ...props, ...otherProps, user })}
          />
        );
    }
    if (location.pathname.includes('dashboard')) {
      return (
        <Redirect
          to={`/login?${queryString.stringify({
            redirect: location.pathname + location.search,
          })}`}
        />
      );
    }
    if (location.pathname.includes('logout')) {
      this.props.logout();
    }
    return <Redirect to="/login" />;
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withUserReducer,
  withUserSaga,
  withConnect,
)(AuthRoute);
