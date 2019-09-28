import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TemplatePage from '../Common/PageWrapper';
import Subsection from '../../components/Section/Subsection';
import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import { DAEMON } from '../../utils/constants';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import './styles.css';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload });
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
class EmailPage extends React.PureComponent {
  static propTypes = {
    dispatchAction: PropTypes.func.isRequired,
    users: PropTypes.object,
    location: PropTypes.object,
    goTo: PropTypes.func,
  };

  state = { message: '' };

  render() {
    const { message } = this.state;
    return (
      <TemplatePage {...this.props}>
        <Subsection style={{ padding: '200px' }}>
          {message === '' && <h1>Loading...</h1>}
          {message !== '' && <p style={{ color: 'red' }}>{message}</p>}
        </Subsection>
      </TemplatePage>
    );
  }
  componentDidMount() {
    const { location } = this.props;
    const endpoint = location.pathname.split('/')[
      location.pathname.split('/').length - 1
    ];
    const query = queryString.parse(location.search);
    if (endpoint === 'activate') {
      this.props.dispatchAction({
        type: USERS.ACTIVATE.REQUESTED,
        payload: {
          data: query,
          url: 'activate',
        },
      });
    }
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.users.isLoggedIn !== this.props.users.isLoggedIn) {
      if (this.props.users.isLoggedIn) {
        this.props.goTo({ path: '/dashboard' });
      }
    }
    if (
      prevProps.users.ACTIVATE.message !== this.props.users.ACTIVATE.message &&
      this.props.users.ACTIVATE.message
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ message: this.props.users.ACTIVATE.message });
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(EmailPage);

// export default EmailPage;
