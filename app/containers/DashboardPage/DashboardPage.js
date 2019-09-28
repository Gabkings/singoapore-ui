/* eslint-disable prettier/prettier */
import React from 'react';
// import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import Section from '../../components/Section/Section';
import TemplatePage from '../Common/PageWrapper';
import {
  CATEGORIES, DEALS, FAVOURITES,
  FILES,
  GALLERIES,
  LISTINGS, REVIEWS,
  USERS, MERCHANTS,
} from '../../actions/restApi';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import dashboardReducer, { DASHBOARD_VIEW } from '../../reducers/dashboard';
import saga from '../../sagas';
import userReducer from '../../reducers/user';
import userSaga from '../../sagas/user';
import { DAEMON } from '../../utils/constants';
import Subsection from '../../components/Section/Subsection';
import { profile } from './content';
import AccountSubPage from './AccountSubPage';
import ProfilePaper from './ProfilePaper';
import ListingsSubPage from './ListingsSubPage';
import './dashboard.css';
import FavouritesSubPage from './FavouritesSubPage';
import NotificationSettingSubPage from './NotificationSettingSubPage';
import DealsSubPage from './DealsSubPage';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload, contentType }) => {
    dispatch({ type, payload, view: DASHBOARD_VIEW, contentType });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [DASHBOARD_VIEW]: state.get(DASHBOARD_VIEW).toJS(),
  user: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withDashboardReducer = injectReducer({
  key: DASHBOARD_VIEW,
  reducer: dashboardReducer,
});
const withListingSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});
const withCategorySaga = injectSaga({
  key: CATEGORIES.MODEL,
  saga: saga(CATEGORIES),
  mode: DAEMON,
});
const withGallerySaga = injectSaga({
  key: GALLERIES.MODEL,
  saga: saga(GALLERIES),
  mode: DAEMON,
});
const withFilesSaga = injectSaga({
  key: FILES.MODEL,
  saga: saga(FILES),
  mode: DAEMON,
});
const withReviewsSaga = injectSaga({
  key: REVIEWS.MODEL,
  saga: saga(REVIEWS),
  mode: DAEMON,
});
const withFavouritesSaga = injectSaga({
  key: FAVOURITES.MODEL,
  saga: saga(FAVOURITES),
  mode: DAEMON,
});
const withDealsSaga = injectSaga({
  key: DEALS.MODEL,
  saga: saga(DEALS),
  mode: DAEMON,
});
const withMerchantsSaga = injectSaga({
  key: MERCHANTS.MODEL,
  saga: saga(MERCHANTS),
  mode: DAEMON,
});
const withUserReducer = injectReducer({
  key: USERS.MODEL,
  reducer: userReducer,
});
const withUserSaga = injectSaga({
  key: USERS.MODEL,
  saga: userSaga,
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class DashboardPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    currentTab: PropTypes.string,
    [DASHBOARD_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func,
  };
  render() {
    const { currentTab, user } = this.props;
    const isMerchant =
      user.LOAD_AUTH.data.merchantId !== null &&
      user.LOAD_AUTH.data.merchantId !== undefined &&
      user.LOAD_AUTH.data.merchantId !== -1;
    const enableChat = user.user.enable_chat;
    const dashboardTabs = [
      {
        name: 'Account Settings',
        link: 'account',
        display: ['consumer', 'merchant'],
      },
      {
        name: 'Notification Settings',
        link: 'notifications',
        display: ['consumer', 'merchant'],
      },
      {
        name: 'Favourites',
        link: 'favourites',
        display: ['consumer'],
      },
      {
        name: 'Listings & Galleries',
        link: 'listings',
        display: ['merchant'],
      },
      {
        name: 'Deals',
        link: 'deals',
        display: ['merchant'],
        onlyIfEnableChat: true,
      },
    ].filter(
      tab => tab.display.indexOf(isMerchant ? 'merchant' : 'consumer') !== -1
    ).filter(
      tab => !tab.onlyIfEnableChat ? true : enableChat
    );
    const tabLinks = dashboardTabs.map(tab => tab.link);

    return (
      <TemplatePage {...this.props}>
        <Section className="dashboard" id="dashboard-section">
          <Subsection>
            <ProfilePaper profile={profile} dashboardTabs={dashboardTabs} {...this.props} />
            {tabLinks.indexOf(currentTab) !== -1 && currentTab === 'account' && (
              <AccountSubPage {...this.props} profile={profile} />
            )}
            {tabLinks.indexOf(currentTab) !== -1 &&
              user.LOAD_AUTH.data.merchantId !== null &&
              user.LOAD_AUTH.data.merchantId !== -1 && (
              <ListingsSubPage {...this.props} />
            )}
            {tabLinks.indexOf(currentTab) !== -1 && currentTab === 'favourites' && (
              <FavouritesSubPage
                dispatchAction={this.props.dispatchAction}
                {...this.props}
              />
            )}
            {tabLinks.indexOf(currentTab) !== -1 && currentTab === 'notifications' && (
              <NotificationSettingSubPage
                dispatchAction={this.props.dispatchAction}
                {...this.props}
              />
            )}
            {tabLinks.indexOf(currentTab) !== -1 && currentTab === 'deals' && (
              <DealsSubPage
                dispatchAction={this.props.dispatchAction}
                {...this.props}
              />
            )}
          </Subsection>
        </Section>
      </TemplatePage>
    );
  }

}

export default compose(
  // Put `withReducer` before `withConnect`
  withUserReducer,
  withDashboardReducer,
  withUserSaga,
  withListingSaga,
  withCategorySaga,
  withFilesSaga,
  withGallerySaga,
  withReviewsSaga,
  withFavouritesSaga,
  withDealsSaga,
  withMerchantsSaga,
  withConnect,
)(DashboardPage);
