/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
// import v4 from 'uuid/v4';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { CONSUMERS, LISTINGS, FILES, GALLERIES, REVIEWS, CATEGORIES, REPORTS, FORM_SUBMISSIONS, FEATURE_SWITCHES, USERS } from '../../actions/restApi';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import './styles.css';
import galleryReducer, { GALLERY_VIEW } from '../../reducers/gallery';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
import ProfessionalsInfoCard from '../../containers/ProfessionalsPage/ProfessionalsInfoCard';
import FavoriteButton from '../../components/CustomButton/FavoriteButton';
import ImageWrapper from '../../components/Base/Image';
import LocationIcon from '../../images/location-icon.png';
import CoinIcon from '../../images/coin-icon.png';
import Section from '../../components/Section/Section';
import ConnectProfessionalsSubsection from '../ProfessionalsPage/ConnectProfessionalsSubsection';
import GalleryDetailCarousel from '../../components/GalleryCarousel/GalleryDetailCarousel';
import NotFoundSection from '../NotFoundPage/NotFoundSection';
import Loader from '../Common/Loader';
import ReportModal from '../ProfessionalsPage/ReportModal';
import servicesReducer, { SERVICES_VIEW } from '../../reducers/services';
import chatReducer, { CHAT_VIEW } from '../../reducers/chat';

import professionalsReducer from '../../reducers/professionals';
import categorySaga from '../../sagas/category';
import ReducerFactory from '../../reducers/ReducerFactory';
import chatSaga from '../../sagas/chat';
export const PROFESSIONALS_VIEW = 'professionals';
// const videoEmbedCode = <iframe title="video" width="560" height="315" src="https://www.youtube.com/embed/lPOyaHAItAw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    


const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: GALLERY_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path, payload.state));
  },
});

const mapStateToProps = state => ({
  [GALLERY_VIEW]: state.get(GALLERY_VIEW).toJS(),
  user: state.get(USERS.MODEL).toJS(),
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

const withGalleryReducer = injectReducer({
  key: GALLERY_VIEW,
  reducer: galleryReducer,
});
const withServiceReducer = injectReducer({
  key: SERVICES_VIEW,
  reducer: servicesReducer,
});

const withCategorySaga = injectSaga({
  key: CATEGORIES.MODEL,
  saga: saga(CATEGORIES),
  mode: DAEMON,
});
const withListingsSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});

const withGallerySaga = injectSaga({
  key: GALLERIES.MODEL,
  saga: saga(GALLERIES),
  mode: DAEMON,
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
class GalleryDetailPage extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    [GALLERY_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func,
    goTo: PropTypes.func,
    match: PropTypes.object,
    user: PropTypes.object,
  };
  state = {
    aboutLength: 'short',
  };

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

  fetchGalleries = slug => {
    this.props.dispatchAction({
      type: GALLERIES.LIST.REQUESTED,
      payload: {
        query: {
          slug,
        },
      },
    });
  };
  fetchListing = id => {
    this.props.dispatchAction({
      type: LISTINGS.LIST.REQUESTED,
      payload: {
        query: {
          id,
          exclude_inactive: 'true',
        },
      },
    });
  };

  componentDidMount() {
    this.fetchCategories();
    this.fetchGalleries(this.props.match.params.slug);
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const currentGallery = this.props[GALLERY_VIEW][GALLERIES.MODEL];
    const previousGallery = prevProps[GALLERY_VIEW][GALLERIES.MODEL];
    if (
      previousGallery.results.length > 0 &&
      currentGallery.results.length > 0 &&
      previousGallery.results[0].id !== currentGallery.results[0].id
    ) {
      if (currentGallery.results[0].listing) {
        this.fetchListing(currentGallery.results[0].listing);
      }
    }
    if (
      previousGallery.results.length === 0 &&
      currentGallery.results.length > 0
    ) {
      if (currentGallery.results[0].listing) {
        this.fetchListing(currentGallery.results[0].listing);
      } else {
        this.fetchListing(-1);
      }
    }
    if (previousGallery.results.length > 1 && currentGallery.results.length === 1) {
      if (currentGallery.results[0].listing) {
        this.fetchListing(currentGallery.results[0].listing);
      } else {
        this.fetchListing(-1);
      }
    }
  }

  render() {
    const { galleries, categories, listings } = this.props[GALLERY_VIEW];
    const services = this.props[SERVICES_VIEW];
    const listing = this.props[GALLERY_VIEW][LISTINGS.MODEL].results[0]
    return (
      <TemplatePage {...this.props}>
        {galleries && galleries.requesting && <Loader />}
        {galleries && !galleries.requesting &&
        galleries.count === 0 && (
          <NotFoundSection/>
        )}
        {galleries && !galleries.requesting &&
        galleries.count === 1 && (
          <Subsection id="gallery-detail-page">
            {galleries.results[0].listing_merchant_id !== this.props.user.LOAD_AUTH.data.merchantId && !galleries.results[0].is_approved && (<NotFoundSection/>)}
            {(galleries.results[0].is_approved || galleries.results[0].listing_merchant_id === this.props.user.LOAD_AUTH.data.merchantId) && (
              <TwoColumn>
                <Grid.Column width={10}>
                  {galleries &&
                    galleries.count === 1 && (
                    <Section>
                      <Subsection>
                        <PaperWrapper className="paper">
                          <Subsection>
                            <div className="gallery-title">
                              <h1>
                                {galleries.results[0].wp_post_title}
                                <span style={{ color: 'orange' }}>!</span>
                                {galleries.results[0].listing_merchant_id === this.props.user.LOAD_AUTH.data.merchantId && !galleries.results[0].is_approved && <span style={{color: 'grey'}}>(This Gallery is not yet approved and can only be viewed by the owner)</span>}
                              </h1>
                              {this.props.user.isLoggedIn && this.props.user.LOAD_AUTH.data.consumerId !== null && (
                                <FavoriteButton
                                  buttonProps={{
                                    className: 'gallery-favourite',
                                    onClick: () => {
                                      this.props.dispatchAction({
                                        type: CONSUMERS.POST.REQUESTED,
                                        payload: {
                                          id: this.props.user.LOAD_AUTH.data.consumerId,
                                          url: 'favourite',
                                          data: {
                                            gallery_slug: galleries.results[0].slug,
                                          },
                                        },
                                      })
                                    },
                                  }}
                                  iconProps={{}}
                                  isFavourite={this.props.user[CONSUMERS.MODEL].favourite_galleries && this.props.user[CONSUMERS.MODEL].favourite_galleries.indexOf(galleries.results[0].slug) !== -1}
                                />
                              )}
                            </div>
                            <div className="gallery-about">
                              <h3>About:</h3>
                              <div>
                                {galleries.results[0].about_rich_text.length <
                                    800 &&
                                    renderHTML(
                                      galleries.results[0].about_rich_text,
                                    )}
                                {galleries.results[0].about_rich_text.length >=
                                    800 &&
                                    this.state.aboutLength === 'short' &&
                                    `${renderHTML(
                                      galleries.results[0].about_rich_text.slice(
                                        0,
                                        800,
                                      ),
                                    )}...`}
                                {galleries.results[0].about_rich_text.length >=
                                    800 &&
                                    this.state.aboutLength === 'long' &&
                                    renderHTML(
                                      galleries.results[0].about_rich_text,
                                    )}
                              </div>
                              <button
                                className="view-more-link"
                                onClick={this.toggleAboutLength}
                              >
                                {galleries.results[0].about_rich_text.length >=
                                    800 &&
                                    (this.state.aboutLength === 'short'
                                      ? 'View More'
                                      : 'View Less')}
                              </button>
                            </div>
                          </Subsection>
                          {(galleries.results[0].address !== null) && (
                            <Section className="gallery-info-extension">
                              <TwoColumn>
                                <Grid.Column>
                                  <Subsection>
                                    <div className="info-label">
                                      <ImageWrapper src={LocationIcon} />
                                      <span>Location:</span>
                                    </div>
                                  </Subsection>
                                </Grid.Column>
                                <Grid.Column>
                                  <Subsection>
                                    <span>
                                      <strong>
                                        {galleries.results[0].address}
                                      </strong>
                                    </span>
                                  </Subsection>
                                </Grid.Column>
                              </TwoColumn>
                            </Section>
                          )}
                          {(galleries.results[0].estimated_project_cost !== null) && (
                            <Section className="gallery-info-extension last-row">
                              <TwoColumn>
                                <Grid.Column>
                                  <Subsection>
                                    <div className="info-label">
                                      <ImageWrapper src={CoinIcon} />
                                      <span>Estimate Cost:</span>
                                    </div>
                                  </Subsection>
                                </Grid.Column>
                                <Grid.Column>
                                  <Subsection>
                                    <span>
                                      <strong>
                                        {
                                          galleries.results[0]
                                            .estimated_project_cost
                                        }
                                      </strong>
                                    </span>
                                  </Subsection>
                                </Grid.Column>
                              </TwoColumn>
                            </Section>
                          )}
                        </PaperWrapper>
                      </Subsection>
                      {galleries.results[0].files.filter(
                        file => file.is_gallery_before_images,
                      ).length > 0 && (
                        <Subsection className="gallery-photos">
                          <h2>Before Photos:</h2>
                          <GalleryDetailCarousel
                            height={650}
                            images={galleries.results[0].files
                              .filter(file => file.is_gallery_before_images)
                              .map(file => ({
                                src: file.file_field,
                                alt: file.alt,
                                address: galleries.results[0].address,
                                company: listing && listing.name,
                              }))}
                          />
                        </Subsection>
                      )}
                      {galleries.results[0].files.filter(
                        file => !file.is_gallery_before_images,
                      ).length > 0 && (
                        <Subsection className="gallery-photos">
                          <h2>After Photos:</h2>
                          <GalleryDetailCarousel
                            height={650}
                            images={galleries.results[0].files
                              .filter(file => !file.is_gallery_before_images)
                              .map(file => ({
                                src: file.file_field,
                                alt: file.alt,
                                address: galleries.results[0].address,
                                company: listing && listing.name,
                              }))}
                          />
                        </Subsection>
                      )}
                      {/* <Subsection className="gallery-photos">
                        <h2>Video:</h2>
                        {listings && !listings.requesting && listing && (
                          listing.video_embed_code ? listing.video_embed_code : videoEmbedCode
                        )}
                      </Subsection>    */}
                    </Section>
                  )}
                </Grid.Column>
                <Grid.Column width={6}>
                  {listings && listings.requesting && <Loader/>}
                  {listings && !listings.requesting && listing && (
                    <Subsection>
                      <ProfessionalsInfoCard
                        professional={listing}
                        view="gallery"
                        goTo={this.props.goTo}
                        categories={categories}
                        services={services}
                        dispatchAction={this.props.dispatchAction}
                        user={this.props.user}
                        // location={this.props.location}
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
                  )}
                  {listing && <ConnectProfessionalsSubsection {...this.props} />}
                </Grid.Column>
              </TwoColumn>
            )}
          </Subsection>
        )}
      </TemplatePage>
    );
  }
  toggleAboutLength = () => {
    this.setState({
      aboutLength: this.state.aboutLength === 'long' ? 'short' : 'long',
    });
  };
}



export default compose(
  // Put `withReducer` before `withConnect`
  withFeatureSwitchReducer,
  withFeatureSwitchSaga,
  withReviewsSaga,
  withCategoriesSaga,
  withChatReducer,
  withReportsSaga,
  withFileSaga,
  withListingSaga,
  withFormSubmissionsSaga,
  withProfessionalReducer,
  withChatSaga,
  withSaga,
  withGalleryReducer,
  withServiceReducer,
  withCategorySaga,
  withGallerySaga,
  withListingsSaga,
  withConnect,
)(GalleryDetailPage);
