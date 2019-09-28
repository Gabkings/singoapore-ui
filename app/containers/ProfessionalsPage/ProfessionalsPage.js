/* eslint-disable no-else-return */
/* eslint-disable prettier/prettier */
import React from 'react';
import MediaQuery from 'react-responsive';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
import { listing as defaultListing } from './content';
import Subsection from '../../components/Section/Subsection';
import ProfessionalsInfoCardForProfessionals from './ProfessionalsInfoCardForProfessionals';
import VideoSubsection from './VideoSubsection';
import AboutSubsection from './AboutSubsection';
import ImageSubsection from './ImageSubsection';
import TemplatePage from '../Common/PageWrapper';
import GalleriesSubsection from './GalleriesSubsection';
import ReviewsSubsection from './ReviewsSubsection';
import { LISTINGS, FILES, GALLERIES, REVIEWS, CATEGORIES, REPORTS, FORM_SUBMISSIONS, FEATURE_SWITCHES, USERS } from '../../actions/restApi';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import saga from '../../sagas';
import chatSaga from '../../sagas/chat';
import { DAEMON } from '../../utils/constants';
import { orange } from '../../components/Base/constants';
import ImageWrapper from '../../components/Base/Image';
import VerifiedIcon from '../../components/CustomIcon/VerifiedIcon';
import professionalsReducer from '../../reducers/professionals';
import chatReducer, { CHAT_VIEW } from '../../reducers/chat';
import FaqSubsection from './FaqSubsection';
import { getS3Image } from '../../utils/images';
import ConnectProfessionalsSubsection from './ConnectProfessionalsSubsection';
import ReportModal from './ReportModal';
import NotFoundSection from '../NotFoundPage/NotFoundSection';
import Loader from '../Common/Loader';
import { CHAT_USER } from '../../actions/chatApi';
import servicesReducer, { SERVICES_VIEW } from '../../reducers/services';
import categorySaga from '../../sagas/category';
import ReducerFactory from '../../reducers/ReducerFactory';

const ReliableProBadge = getS3Image(
  '/images/ProfessionalsPage/Reliable Pro 2019 Badge.png',
);

const Listing = getS3Image('/images/ProfessionalsPage/listing.png');

export const PROFESSIONALS_VIEW = 'professionals';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: PROFESSIONALS_VIEW });
  },
  dispatchServicesAction: ({ type, payload }) => {
    dispatch({ type, payload, view: SERVICES_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path, payload.state));
  },
});

const mapStateToProps = state => ({
  [PROFESSIONALS_VIEW]: state.get(PROFESSIONALS_VIEW).toJS(),
  [CHAT_VIEW]: state.get(CHAT_VIEW).toJS(),
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

const withProfessionalReducer = injectReducer({
  key: PROFESSIONALS_VIEW,
  reducer: professionalsReducer,
});
const withChatReducer = injectReducer({
  key: CHAT_VIEW,
  reducer: chatReducer,
});
const withListingSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});
const withFileSaga = injectSaga({
  key: FILES.MODEL,
  saga: saga(FILES),
  mode: DAEMON,
});
const withGallerySaga = injectSaga({
  key: GALLERIES.MODEL,
  saga: saga(GALLERIES),
  mode: DAEMON,
});
const withReviewsSaga = injectSaga({
  key: REVIEWS.MODEL,
  saga: saga(REVIEWS),
  mode: DAEMON,
});
const withCategoriesSaga = injectSaga({
  key: CATEGORIES.MODEL,
  saga: saga(CATEGORIES),
  mode: DAEMON,
});
const withReportsSaga = injectSaga({
  key: REPORTS.MODEL,
  saga: saga(REPORTS),
  mode: DAEMON,
});
const withChatSaga = injectSaga({
  key: CHAT_VIEW,
  saga: chatSaga,
  mode: DAEMON,
});


const withSaga = injectSaga({
  key: `${SERVICES_VIEW}/${CATEGORIES.MODEL}`,
  saga: categorySaga,
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
const {reducer: featureSwitchReducer} = ReducerFactory(FEATURE_SWITCHES.MODEL, [FEATURE_SWITCHES.MODEL]);
const withFeatureSwitchReducer = injectReducer({
  key: FEATURE_SWITCHES.MODEL,
  reducer: featureSwitchReducer,
});

/* eslint-disable react/prefer-stateless-function */
class ProfessionalsPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    [PROFESSIONALS_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func,
    user: PropTypes.object,
  };
  
  render() {
    const { goTo } = this.props;
    const services = this.props[SERVICES_VIEW];
    let listing = this.props[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET;
    if (listing === undefined) {
      listing = defaultListing;
    }
    const images = this.props[PROFESSIONALS_VIEW][FILES.MODEL].LIST;
    const galleries = this.props[PROFESSIONALS_VIEW][GALLERIES.MODEL].LIST;
    // const articles = this.props[PROFESSIONALS_VIEW][WP_POSTS.MODEL].LIST;
    const verifiedJsx = (
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <VerifiedIcon /> &nbsp; <span style={{ color: '#bbb' }}>Verified</span>
      </div>
    );
    const categories = this.props[PROFESSIONALS_VIEW][CATEGORIES.MODEL].LIST;
    return window.innerWidth <= 768 
      ? (<React.Fragment>
        <MediaQuery query="(max-width: 768px)">
          {isPhone => (
            <TemplatePage {...this.props}>
              {listing.requesting && <Loader />}
              {!listing.requesting && listing.id && (listing.is_approved || listing.merchant === this.props.user.LOAD_AUTH.data.merchantId) && (
                <Subsection id="professionals">
                  <TwoColumn>
                    <Grid.Column width={10} style={{ paddingRight: '0px' }}>
                      <Subsection id="name">
                        <PaperWrapper className="paper">
                          <Subsection>
                            <h1>{listing.name}</h1>
                            {!listing.is_approved && <h3 style={{ color: 'grey' }}>(This Listing is not yet approved and can only be viewed by the owner)</h3>}
                            {listing.is_verified && verifiedJsx}
                          </Subsection>
                        </PaperWrapper>
                      </Subsection>
                      {listing &&
                        listing.video_embed_code && <VideoSubsection professional={listing} />}
                      <Subsection id="professionals-info">
                        <ProfessionalsInfoCardForProfessionals
                          dispatchAction={this.props.dispatchAction}
                          user={this.props.user}
                          professional={listing}
                          services={services}
                          view="professionals"
                          goTo={this.props.goTo}
                          categories={categories}
                          isOnline={this.props[CHAT_VIEW].CHAT_USER.ONLINE_STATUS.response}
                          {...this.props}
                        />
                        <div id="report-listing">
                          <ReportModal
                            {...this.props}
                            listing={listing}
                            triggerButtonChild={
                              <div>
                                <i className="icon flag" />
                                Report this listing
                              </div>
                            }
                          />
                        </div>
                      </Subsection>

                      <AboutSubsection professional={listing} />
                      {images &&
                        images.results &&
                        images.results.length > 0 && (
                        <ImageSubsection images={images} />
                      )}
                      {galleries &&
                        galleries.results &&
                        galleries.results.filter(g => g.is_approved).length > 0 && (
                        <GalleriesSubsection
                          galleries={galleries}
                          isPhone={isPhone}
                          goTo={goTo}
                        />
                      )}
                      {listing &&
                        listing.faq_data &&
                        listing.faq_data.items &&
                        listing.faq_data.items.length > 0 && (
                        <FaqSubsection professional={listing} />
                      )}
                      <ReviewsSubsection
                        professional={listing}
                        reviews={this.props[PROFESSIONALS_VIEW][REVIEWS.MODEL].LIST}
                        user={this.props.user}
                        dispatchAction={this.props.dispatchAction}
                      />
                    </Grid.Column>
                    <Grid.Column width={6} style={{ paddingLeft: '0px' }}>
                      {/* here put professional div */}
                      <ConnectProfessionalsSubsection {...this.props} />
                      {listing.best_pros_badge && (
                        <Subsection>
                          <PaperWrapper className="paper">
                            <Subsection style={{ padding: '10px' }}>
                              <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                                Awards:
                              </h1>
                              <Subsection>
                                <ImageWrapper
                                  style={{ display: 'inline-block', width: '150px' }}
                                  src={ReliableProBadge}
                                  alt="SGHomeNeeds Reliable Pros"
                                />
                              </Subsection>
                              {this.props.user.isLoggedIn && this.props.user.LOAD_AUTH.data.merchantId && this.props.user.LOAD_AUTH.data.merchantId > 0 && (
                                <div
                                  style={{
                                    backgroundColor: '#fafafa',
                                    textAlign: 'left',
                                    margin: '10px',
                                    padding: '20px',
                                  }}
                                >                                <textarea
                                    onClick={e => { e.target.focus(); e.target.select(); }}
                                    style={{ width: '100%', height: '120px' }}
                                    value={`<!----- Copy and Paste This Code Into Your Post ---->\n<a href="https://sghomeneeds.com${this.props.location.pathname}">\n<img src="${ReliableProBadge}" alt="SGHomeNeeds Reliable Pros" width="50px"/>\n</a>`}
                                    readOnly
                                  />
                                </div>
                              )}
                            </Subsection>
                          </PaperWrapper>
                        </Subsection>
                      )}
                      {this.props.user.isLoggedIn && this.props.user.LOAD_AUTH.data.merchantId && this.props.user.LOAD_AUTH.data.merchantId > 0 && (
                        <Subsection>
                          <PaperWrapper className="paper">
                            <Subsection style={{ padding: '10px' }}>
                              <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                                Place This Listing on your Site!
                              </h1>
                              <Subsection>
                                <div
                                  style={{
                                    backgroundColor: orange,
                                    padding: '33px',
                                    borderRadius: '62px',
                                    width: '124px',
                                    display: 'inline-block',
                                  }}
                                >
                                  <ImageWrapper
                                    style={{ display: 'inline-block' }}
                                    src={Listing}
                                    alt="SGHomeNeeds Professionals"
                                  />
                                </div>
                              </Subsection>
                              <div
                                style={{
                                  backgroundColor: '#fafafa',
                                  textAlign: 'left',
                                  margin: '10px',
                                  padding: '20px',
                                }}
                              >
                                <textarea
                                  onClick={e => { e.target.focus(); e.target.select(); }}
                                  style={{ width: '100%', height: '120px' }}
                                  value={`<!----- Copy and Paste This Code Into Your Post ---->\n<a href="https://sghomeneeds.com${this.props.location.pathname}">\n<img src="https://sghomeneeds-gallery-prod.s3.amazonaws.com/File/None/Logo_Circle.png" alt="SGHomeNeeds Professionals" width="50px"/>\n</a>`}
                                  readOnly
                                />
                              </div>
                            </Subsection>
                          </PaperWrapper>
                        </Subsection>
                      )}
                    </Grid.Column>
                  </TwoColumn>
                </Subsection>
              )}
              {!listing.requesting && (listing.id === undefined || !(listing.is_approved || listing.merchant === this.props.user.LOAD_AUTH.data.merchantId)) && (
                <NotFoundSection />
              )}
            </TemplatePage>
          )}
        </MediaQuery>
      </React.Fragment>)
      : (<React.Fragment>
        <MediaQuery query="(max-width: 768px)">
          {isPhone => (
            <TemplatePage {...this.props}>
              {listing.requesting && <Loader />}
              {!listing.requesting && listing.id && (listing.is_approved || listing.merchant === this.props.user.LOAD_AUTH.data.merchantId) && (
                <Subsection id="professionals">
                  <TwoColumn>
                    <Grid.Column width={10} style={{ paddingRight: '0px' }}>
                      <Subsection id="name">
                        <PaperWrapper className="paper">
                          <Subsection>
                            <h1>{listing.name}</h1>
                            {!listing.is_approved && <h3 style={{ color: 'grey' }}>(This Listing is not yet approved and can only be viewed by the owner)</h3>}
                            {listing.is_verified && verifiedJsx}
                          </Subsection>
                        </PaperWrapper>
                      </Subsection>
                      {listing &&
                        listing.video_embed_code && <VideoSubsection professional={listing} />}
                      
                      <AboutSubsection professional={listing} />
                      {images &&
                        images.results &&
                        images.results.length > 0 && (
                        <ImageSubsection images={images} />
                      )}
                      {galleries &&
                        galleries.results &&
                        galleries.results.filter(g => g.is_approved).length > 0 && (
                        <GalleriesSubsection
                          galleries={galleries}
                          isPhone={isPhone}
                          goTo={goTo}
                        />
                      )}
                      {listing &&
                        listing.faq_data &&
                        listing.faq_data.items &&
                        listing.faq_data.items.length > 0 && (
                        <FaqSubsection professional={listing} />
                      )}
                      <ReviewsSubsection
                        professional={listing}
                        reviews={this.props[PROFESSIONALS_VIEW][REVIEWS.MODEL].LIST}
                        user={this.props.user}
                        dispatchAction={this.props.dispatchAction}
                      />
                    </Grid.Column>
                    <Grid.Column width={6} style={{ paddingLeft: '0px' }}>
                      <Subsection id="professionals-info">
                        <ProfessionalsInfoCardForProfessionals
                          dispatchAction={this.props.dispatchAction}
                          user={this.props.user}
                          professional={listing}
                          services={services}
                          view="professionals"
                          goTo={this.props.goTo}
                          categories={categories}
                          isOnline={this.props[CHAT_VIEW].CHAT_USER.ONLINE_STATUS.response}
                          showCategoryForm={this.showCategoryForm}
                          {...this.props}
                        />
                        <div id="report-listing">
                          <ReportModal
                            {...this.props}
                            listing={listing}
                            triggerButtonChild={
                              <div>
                                <i className="icon flag" />
                                Report this listing
                              </div>
                            }
                          />
                        </div>
                      </Subsection>

                      <ConnectProfessionalsSubsection {...this.props} />
                      {listing.best_pros_badge && (
                        <Subsection>
                          <PaperWrapper className="paper">
                            <Subsection style={{ padding: '10px' }}>
                              <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                                Awards:
                              </h1>
                              <Subsection>
                                <ImageWrapper
                                  style={{ display: 'inline-block', width: '150px' }}
                                  src={ReliableProBadge}
                                  alt="SGHomeNeeds Reliable Pros"
                                />
                              </Subsection>
                              {this.props.user.isLoggedIn && this.props.user.LOAD_AUTH.data.merchantId && this.props.user.LOAD_AUTH.data.merchantId > 0 && (
                                <div
                                  style={{
                                    backgroundColor: '#fafafa',
                                    textAlign: 'left',
                                    margin: '10px',
                                    padding: '20px',
                                  }}
                                >                                <textarea
                                    onClick={e => { e.target.focus(); e.target.select(); }}
                                    style={{ width: '100%', height: '120px' }}
                                    value={`<!----- Copy and Paste This Code Into Your Post ---->\n<a href="https://sghomeneeds.com${this.props.location.pathname}">\n<img src="${ReliableProBadge}" alt="SGHomeNeeds Reliable Pros" width="50px"/>\n</a>`}
                                    readOnly
                                  />
                                </div>
                              )}
                            </Subsection>
                          </PaperWrapper>
                        </Subsection>
                      )}
                      {this.props.user.isLoggedIn && this.props.user.LOAD_AUTH.data.merchantId && this.props.user.LOAD_AUTH.data.merchantId > 0 && (
                        <Subsection>
                          <PaperWrapper className="paper">
                            <Subsection style={{ padding: '10px' }}>
                              <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                                Place This Listing on your Site!
                              </h1>
                              <Subsection>
                                <div
                                  style={{
                                    backgroundColor: orange,
                                    padding: '33px',
                                    borderRadius: '62px',
                                    width: '124px',
                                    display: 'inline-block',
                                  }}
                                >
                                  <ImageWrapper
                                    style={{ display: 'inline-block' }}
                                    src={Listing}
                                    alt="SGHomeNeeds Professionals"
                                  />
                                </div>
                              </Subsection>
                              <div
                                style={{
                                  backgroundColor: '#fafafa',
                                  textAlign: 'left',
                                  margin: '10px',
                                  padding: '20px',
                                }}
                              >
                                <textarea
                                  onClick={e => { e.target.focus(); e.target.select(); }}
                                  style={{ width: '100%', height: '120px' }}
                                  value={`<!----- Copy and Paste This Code Into Your Post ---->\n<a href="https://sghomeneeds.com${this.props.location.pathname}">\n<img src="https://sghomeneeds-gallery-prod.s3.amazonaws.com/File/None/Logo_Circle.png" alt="SGHomeNeeds Professionals" width="50px"/>\n</a>`}
                                  readOnly
                                />
                              </div>
                            </Subsection>
                          </PaperWrapper>
                        </Subsection>
                      )}
                    </Grid.Column>
                  </TwoColumn>
                </Subsection>
              )}
              {!listing.requesting && (listing.id === undefined || !(listing.is_approved || listing.merchant === this.props.user.LOAD_AUTH.data.merchantId)) && (
                <NotFoundSection />
              )}
              {/* {<Modal open={this.state.showHouseCleaningFormModal} closeIcon onClose={this.closeHouseCleaningFormModal}>
                <div style={{ height: '530px' }}>
                  {this.renderHouseCleaningForm(true)}
                </div>
              </Modal>} */}
            </TemplatePage>
          )}
        </MediaQuery>
      </React.Fragment>)
    
  }
  fetchCategories = () => {
    this.props.dispatchAction({
      type: CATEGORIES.LIST.REQUESTED,
      payload: {
        query: {
          limit: 300,
        },
        showSpinner: false,
      },
    });
  };

  componentDidMount() {
    const id = this.props.location.pathname.split('/')[2];
    this.props.dispatchAction({
      type: LISTINGS.GET.REQUESTED,
      payload: { id },
    });
    this.props.dispatchAction({
      type: REVIEWS.LIST.REQUESTED,
      payload: {
        query: {
          listing: id,
          limit: 200,
        },
      },
    });
    this.fetchCategories()
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET &&
      this.props[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET.id !==
      prevProps[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET.id
    ) {
      this.props.dispatchAction({
        type: FILES.LIST.REQUESTED,
        payload: {
          query: {
            listing: this.props[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET.id,
          },
        },
      });
      this.props.dispatchAction({
        type: GALLERIES.LIST.REQUESTED,
        payload: {
          query: {
            listing: this.props[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET.id,
          },
        },
      });
      this.props.dispatchAction({
        type: CHAT_USER.ONLINE_STATUS.REQUESTED,
        payload: {
          userId: this.props[PROFESSIONALS_VIEW][LISTINGS.MODEL].GET.chat_user_id,
        },
      })
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withProfessionalReducer,
  withChatReducer,
  withListingSaga,
  withFileSaga,
  withGallerySaga,
  withReviewsSaga,
  withCategoriesSaga,
  withReportsSaga,
  // withBlogSaga,
  withChatSaga,
  withFormSubmissionsSaga,
  withFeatureSwitchSaga,
  withFeatureSwitchReducer,
  withSaga,
  withConnect,
)(ProfessionalsPage);
