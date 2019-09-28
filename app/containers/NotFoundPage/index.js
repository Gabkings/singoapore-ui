import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import { DAEMON } from '../../utils/constants';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import './styles.css';

import { GALLERY_VIEW } from '../../reducers/gallery';
import NotFoundSection from './NotFoundSection';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: GALLERY_VIEW });
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
class NotFoundPage extends React.PureComponent {
  static propTypes = {
    users: PropTypes.object,
    location: PropTypes.object,
    goTo: PropTypes.func,
    dispatchAction: PropTypes.func,
  };
  state = {};
  render() {
    return (
      <TemplatePage {...this.props}>
        <NotFoundSection />
      </TemplatePage>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(NotFoundPage);
