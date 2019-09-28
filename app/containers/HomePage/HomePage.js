import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import queryString from 'query-string';
import { push } from 'react-router-redux';
import { compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import TemplatePage from '../Common/PageWrapper';
import Section from '../../components/Section/Section';
import {
  howItWorks,
  homeProjects,
  differenceList,
  clientReviews,
} from './content';
import BannerSection from './BannerSection';
import HowItWorksSection from './HowItWorksSection';
import BrowseHomeProjectsSection from './BrowseHomeProjectsSection';
import HowDifferentSection from './HowDifferentSection';
import ClientReviewsSection from './ClientReviewsSection';

import './homepage.css';
import injectSaga from '../../utils/injectSaga';
import { GALLERIES, REVIEWS } from '../../actions/restApi';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import homeReducer, { HOME_VIEW } from '../../reducers/home';
import injectReducer from '../../utils/injectReducer';
import AboutUsSection from './AboutUsSection';
import MoreProjects from './MoreProjects';
import MostPopularProjectsSection from './MostPopularProjectsSection';
import CostGuides from './CostGuides';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: HOME_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [HOME_VIEW]: state.get(HOME_VIEW).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({
  key: HOME_VIEW,
  reducer: homeReducer,
});

const withGallerySaga = injectSaga({
  key: GALLERIES.MODEL,
  saga: saga(GALLERIES),
  mode: DAEMON,
});

const withReviewSaga = injectSaga({
  key: REVIEWS.MODEL,
  saga: saga(REVIEWS),
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object,
    [HOME_VIEW]: PropTypes.object,
  };
  render() {
    return (
      <MediaQuery query="(max-width: 700px)">
        {isPhone => (
          <div id="homepage">
            <TemplatePage {...this.props}>
              <BannerSection isPhone={isPhone} {...this.props} />
              <MostPopularProjectsSection
                {...this.props}
              />
              <MoreProjects {...this.props} />
              <HowItWorksSection howItWorks={howItWorks} {...this.props} />
              <Section id="home-articles">
                <CostGuides {...this.props} />
              </Section>
              <BrowseHomeProjectsSection
                homeProjects={homeProjects}
                {...this.props}
              />
              <ClientReviewsSection
                clientReviews={clientReviews}
                {...this.props}
              />
              <HowDifferentSection
                differenceList={differenceList}
                {...this.props}
              />
              <AboutUsSection
                {...this.props}
              />
            </TemplatePage>
          </div>
        )}
      </MediaQuery>
    );
  }

  search = query => {
    const search = queryString.stringify({
      search: query,
    });
    const target = `/directory?${search}`;
    this.props.history.push(target);
  };
}

export default compose(
  withReducer,
  withGallerySaga,
  withReviewSaga,
  withConnect,
)(HomePage);
