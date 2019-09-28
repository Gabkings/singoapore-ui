import React from 'react';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import MediaQuery from 'react-responsive';
import renderHTML from 'react-render-html';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import TemplatePage from '../Common/PageWrapper';
// import ImageBannerSection from '../../components/Section/ImageBannerSection';
// import Subsection from '../../components/Section/Subsection';
import './services-category.css';
import {
  CATEGORIES,
  LISTINGS,
  USERS,
  FORM_SUBMISSIONS, FEATURE_SWITCHES,
} from '../../actions/restApi';
import injectReducer from '../../utils/injectReducer';
import servicesReducer, { SERVICES_VIEW } from '../../reducers/services';
import injectSaga from '../../utils/injectSaga';
import categorySaga from '../../sagas/category';
import { DAEMON } from '../../utils/constants';
import saga from '../../sagas';
import ChildCategory from './ChildCategory';
import ParentCategory from './ParentCategory';

// import { getS3Image } from '../../utils/images';
import NotFoundSection from '../NotFoundPage/NotFoundSection';
import ReducerFactory from '../../reducers/ReducerFactory';

/* const banner = getS3Image(
  '/images/ServicesPage/apartment-architecture-carpet-584399.png',
); */

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: SERVICES_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [SERVICES_VIEW]: state.get(SERVICES_VIEW).toJS(),
  [FEATURE_SWITCHES.MODEL]: state.get(FEATURE_SWITCHES.MODEL).toJS(),
  users: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: SERVICES_VIEW,
  reducer: servicesReducer,
});

const withSaga = injectSaga({
  key: `${SERVICES_VIEW}/${CATEGORIES.MODEL}`,
  saga: categorySaga,
  mode: DAEMON,
});
const withListingSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});

const withFormSubmissionsSaga = injectSaga({
  key: FORM_SUBMISSIONS.MODEL,
  saga: saga(FORM_SUBMISSIONS),
  mode: DAEMON,
});

const withFeatureSwitchSaga = injectSaga({
  key: FEATURE_SWITCHES.MODEL,
  saga: saga(FEATURE_SWITCHES),
  mode: DAEMON,
});
const { reducer: featureSwitchReducer } = ReducerFactory(FEATURE_SWITCHES.MODEL, [FEATURE_SWITCHES.MODEL]);
const withFeatureSwitchReducer = injectReducer({
  key: FEATURE_SWITCHES.MODEL,
  reducer: featureSwitchReducer,
});
/* eslint-disable react/prefer-stateless-function */
class ServicesCategory extends React.Component {
  static propTypes = {
    dispatchAction: PropTypes.func,
    params: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    search: PropTypes.object,
    GET_WITH_CHILDREN: PropTypes.object,
    users: PropTypes.object,
    goTo: PropTypes.func,
  };

  render() {
    const { main, children } = this.props[SERVICES_VIEW][
      CATEGORIES.MODEL
    ].GET_WITH_CHILDREN;

    const query = queryString.parse(this.props.location.search);
    const pageNumber = parseInt(query.page || 1, 10);
    const { slug } = this.props.match.params;
    return (
      <TemplatePage {...this.props}>
        {this.props[SERVICES_VIEW][CATEGORIES.MODEL].GET_WITH_CHILDREN.error !==
          undefined && <NotFoundSection />}
        {this.props[SERVICES_VIEW][CATEGORIES.MODEL].GET_WITH_CHILDREN.error ===
          undefined && (
          <MediaQuery query="(max-width: 767px)">
            {isPhone => (
              <div className="service-category-wrapper">
                {children && children.length > 0 ? (
                  <ParentCategory
                    parent={main}
                    childrenCategories={children}
                    {...this.props}
                    {...{ isPhone }}
                  />
                ) : (
                  <ChildCategory
                    listings={this.props[SERVICES_VIEW][LISTINGS.MODEL].LIST}
                    page={pageNumber}
                    slug={slug}
                    description={main && main.description}
                    name={main && main.name && renderHTML(main.name)}
                    {...this.props}
                    {...{ isPhone, main, location: this.props.location }}
                  />
                )}
              </div>
            )}
          </MediaQuery>
        )}
      </TemplatePage>
    );
  }

  componentDidMount() {
    this.props.dispatchAction({
      type: CATEGORIES.GET_WITH_CHILDREN.REQUESTED,
      payload: { query: { slug: this.props.match.params.slug } },
    });
  }

  componentDidUpdate(prevProps) {
    const current = this.props[SERVICES_VIEW][CATEGORIES.MODEL]
      .GET_WITH_CHILDREN;
    const previous =
      prevProps[SERVICES_VIEW][CATEGORIES.MODEL].GET_WITH_CHILDREN;
    const { main, children } = current;
    const { main: prevMain } = previous;
    if (
      children &&
      children.length === 0 &&
      (!isEqual(main, prevMain) ||
        prevProps.location.search !== this.props.location.search)
    ) {
      const { page } = queryString.parse(this.props.location.search);
      const offsetQuery = page && page > 1 ? (page - 1) * 10 : '';
      this.props.dispatchAction({
        type: LISTINGS.LIST.REQUESTED,
        payload: {
          query: {
            categories: main.slug,
            offset: offsetQuery,
            exclude_inactive: 'true',
            ranked: true,
          },
        },
      });
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withFeatureSwitchReducer,
  withSaga,
  withListingSaga,
  withFormSubmissionsSaga,
  withFeatureSwitchSaga,
  withConnect,
)(ServicesCategory);
