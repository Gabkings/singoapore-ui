import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import injectReducer from '../../utils/injectReducer';
import isFetchingReducer, { FETCHING_VIEW } from '../../reducers/isfetching';
import injectSaga from '../../utils/injectSaga';
import { DAEMON } from '../../utils/constants';
import spinnerSaga from '../../sagas/isfetching';

const mapStateToProps = state => ({
  [FETCHING_VIEW]: state.get(FETCHING_VIEW),
});

const withConnect = connect(mapStateToProps);

const withIsFetchingReducer = injectReducer({
  key: FETCHING_VIEW,
  reducer: isFetchingReducer,
});
const withIsFetchingSaga = injectSaga({
  key: FETCHING_VIEW,
  saga: spinnerSaga,
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class DashboardPage extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    return (
      <div className="page-wrapper">
        {this.props.children}
        <div
          className="loading-spinner"
          style={{
            width: '100vw',
            height: '100vh',
            background: 'rgba(255,255,255,0.5)',
            zIndex: 2000,
            position: 'fixed',
            top: 0,
            left: 0,
            display: this.props[FETCHING_VIEW] > 0 ? 'block' : 'none',
          }}
        >
          <Icon
            loading
            className="spinner"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              color: 'black',
            }}
          />
        </div>
      </div>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withIsFetchingReducer,
  withIsFetchingSaga,
  withConnect,
)(DashboardPage);
