/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Loader, Modal } from 'semantic-ui-react';
import queryString from 'query-string';
import v4 from 'uuid/v4';
import { isEqual } from 'lodash';
import Card from '../../../components/Base/Card/Card';
import CardContent from '../../../components/Base/Card/CardContent';
import CardImage from '../../../components/Base/Card/CardImage';
import TwoColumn from '../../../components/Section/TwoColumn';
import {
  CATEGORIES,
  FILES,
  GALLERIES,
  LISTINGS,
} from '../../../actions/restApi';
import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';
import './styles.css';
import Divider from '../../../components/Base/Divider';
import ListingModal from '../ProfilePaper/ListingModal';
import { MULTIPART_FORM_DATA } from '../../../utils/actionsUtil';
import GalleryModal from '../ProfilePaper/GalleryModal';
import ButtonWrapper from '../../../components/Base/Button';
import CompanyCard from '../../../components/CompanyList/CompanyCard';
import Subsection from '../../../components/Section/Subsection';
import CustomPagination from '../../../components/CustomPagination';

const numListingsPerPage = 1;
const numGalleriesPerPage = 2;

/* eslint-disable react/prefer-stateless-function */
export default class ListingsSubPage extends React.PureComponent {
  static propTypes = {
    currentTab: PropTypes.string,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    location: PropTypes.object,
  };
  state = {
    openListingModal: false,
    openGalleryModal: false,
    openGalleryTab: 'details',
    opened: false,
    openListingApprovalModal: false,
    openGalleryApprovalModal: false,
    activePage: 1,
    activeGalleryPage: 1,
  };
  render() {
    const { currentTab } = this.props;
    const { openListingModal, openGalleryModal } = this.state;
    // TODO: uncomment when api is working
    const listings = this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST;
    // TODO: remove when api is working
    // const listings = defaultListings;
    return (
      <SubPageWrapper
        currentTab={currentTab}
        tabTitle="Listings & Galleries"
        tabLink="listings"
      >
        <SubPageDescription>
          {
            'Here are all your created listings and projects. A listing is a company. To create, click “add listing” or “add project on the banner above. Remember projects can only be added when you have a listing created.'
          }
        </SubPageDescription>
        <SubPageContent>
          {listings && listings.count !== undefined ? (
            listings.results.map(listing => (
              <div className="listing-group" key={listing.id}>
                <ListingModal
                  modalProps={{
                    dimmer: 'inverted',
                    closeOnDimmerClick: false,
                    trigger: (
                      <div className="listing-card-wrapper">
                        <div className="listing-buttons">
                          <ButtonWrapper
                            design="outline"
                            onClick={() => {
                              this.setState({
                                openListingModal: listing.id,
                              });
                            }}
                            className="edit-button"
                          >
                            EDIT
                          </ButtonWrapper>
                          <ButtonWrapper
                            design="filled"
                            onClick={() => {
                              this.props.goTo({
                                path: `/professionals/${listing.slug}`,
                              });
                            }}
                            className="view-button"
                          >
                            VIEW
                          </ButtonWrapper>
                          <ButtonWrapper
                            disabled={listing.is_approved}
                            design="filled"
                            onClick={() => {
                              this.props.dispatchAction({
                                type: LISTINGS.POST.REQUESTED,
                                payload: {
                                  id: listing.slug,
                                  url: 'submit_for_approval',
                                },
                              });
                              this.setState({ openListingApprovalModal: true });
                            }}
                            className="approve-button"
                          >
                            {!listing.is_approved && 'REQUEST APPROVAL'}
                            {listing.is_approved && 'APPROVED'}
                          </ButtonWrapper>
                        </div>
                        <Modal
                          open={this.state.openListingApprovalModal}
                          onClose={() => {
                            this.setState({ openListingApprovalModal: false });
                          }}
                          size="mini"
                          dimmer="inverted"
                          closeIcon
                        >
                          <Subsection>
                            {this.props[DASHBOARD_VIEW][LISTINGS.MODEL].POST
                              .requesting && <Loader active />}
                            {!this.props[DASHBOARD_VIEW][LISTINGS.MODEL].POST
                              .requesting &&
                              this.props[DASHBOARD_VIEW][LISTINGS.MODEL].POST
                                .error === undefined && (
                              <h3>
                                  Requested. We will get back to you very soon.
                              </h3>
                            )}
                            {!this.props[DASHBOARD_VIEW][LISTINGS.MODEL].POST
                              .requesting &&
                              this.props[DASHBOARD_VIEW][LISTINGS.MODEL].POST
                                .error !== undefined && (
                              <h3 style={{ color: 'red' }}>
                                {
                                  this.props[DASHBOARD_VIEW][LISTINGS.MODEL]
                                    .POST.error
                                }
                              </h3>
                            )}
                          </Subsection>
                        </Modal>
                        <CompanyCard
                          company={listing}
                          goTo={this.props.goTo}
                          user={this.props.user}
                          dispatchAction={this.props.dispatchAction}
                          hideChatButton
                          hideRating
                        />
                      </div>
                    ),
                    open: openListingModal === listing.id,
                    onClose: () => {
                      this.setState({ openListingModal: null });
                    },
                  }}
                  formProps={{
                    onSubmit: formData => {
                      const data = formData;
                      this.updateListing({ data, id: listing.slug });
                    },
                  }}
                  categories={this.props[DASHBOARD_VIEW][CATEGORIES.MODEL].LIST}
                  listing={listing}
                  isCreate={false}
                  dispatchAction={this.props.dispatchAction}
                  refreshListings={this.refreshListings}
                  error={this.props[DASHBOARD_VIEW][LISTINGS.MODEL].GET.error}
                />
                <TwoColumn>
                  {listing.galleries
                    .filter((gallery, i) => (i + 1) / numGalleriesPerPage <= this.state.activeGalleryPage && (i + 1) / numGalleriesPerPage > (this.state.activeGalleryPage - 1))
                    .map(gallery => (
                      <Grid.Column key={v4()}>
                        <GalleryModal
                          modalProps={{
                            dimmer: 'inverted',
                            closeOnDimmerClick: false,
                            trigger: (
                              <div className="gallery-card-wrapper">
                                <div className="gallery-buttons">
                                  <ButtonWrapper
                                    design="outline"
                                    onClick={() => {
                                      this.setState({
                                        openGalleryModal: gallery.id,
                                      });
                                    }}
                                    className="edit-button"
                                  >
                                    EDIT
                                  </ButtonWrapper>
                                  <a href={`/gallery/${gallery.slug}`}>
                                    <ButtonWrapper
                                      design="filled"
                                      className="view-button"
                                    >
                                      VIEW
                                    </ButtonWrapper>
                                  </a>
                                  <ButtonWrapper
                                    disabled={gallery.is_approved}
                                    design="filled"
                                    onClick={() => {
                                      this.props.dispatchAction({
                                        type: GALLERIES.POST.REQUESTED,
                                        payload: {
                                          id: gallery.id,
                                          url: 'submit_for_approval',
                                        },
                                      });
                                      this.setState({ openGalleryApprovalModal: true });
                                    }}
                                    className="approve-button"
                                  >
                                    {!gallery.is_approved && 'REQUEST APPROVAL'}
                                    {gallery.is_approved && 'APPROVED'}
                                  </ButtonWrapper>
                                </div>
                                <Modal
                                  open={this.state.openGalleryApprovalModal}
                                  onClose={() => {
                                    this.setState({ openGalleryApprovalModal: false });
                                  }}
                                  size="mini"
                                  dimmer="inverted"
                                  closeIcon
                                >
                                  <Subsection>
                                    {this.props[DASHBOARD_VIEW][GALLERIES.MODEL].POST
                                      .requesting && <Loader active />}
                                    {!this.props[DASHBOARD_VIEW][GALLERIES.MODEL].POST
                                      .requesting &&
                                    this.props[DASHBOARD_VIEW][GALLERIES.MODEL].POST
                                      .error === undefined && (
                                      <h3>
                                        Requested. We will get back to you very soon.
                                      </h3>
                                    )}
                                    {!this.props[DASHBOARD_VIEW][GALLERIES.MODEL].POST
                                      .requesting &&
                                    this.props[DASHBOARD_VIEW][GALLERIES.MODEL].POST
                                      .error !== undefined && (
                                      <h3 style={{ color: 'red' }}>
                                        {
                                          this.props[DASHBOARD_VIEW][GALLERIES.MODEL]
                                            .POST.error
                                        }
                                      </h3>
                                    )}
                                  </Subsection>
                                </Modal>
                                <Card className="listing-image">
                                  {gallery.files.length > 0 && (
                                    <CardImage
                                      source={gallery.files[0].file_field}
                                    />
                                  )}
                                  <CardContent>
                                    <h3>{gallery.wp_post_title}</h3>
                                  </CardContent>
                                </Card>
                              </div>
                            ),
                            open: openGalleryModal === gallery.id,
                            onClose: () => {
                              this.setState({ openGalleryModal: null, openGalleryTab: 'details' });
                            },
                          }}
                          formProps={{
                            onSubmit: formData => {
                              this.props.dispatchAction({
                                type: GALLERIES.PATCH.REQUESTED,
                                payload: { data: formData, id: gallery.id },
                                contentType: MULTIPART_FORM_DATA,
                              });
                              this.setState({ openGalleryModal: null, openGalleryTab: 'details'})
                            },
                          }}
                          listings={
                            this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST
                          }
                          dispatchAction={this.props.dispatchAction}
                          gallery={gallery}
                          activeItem={this.state.openGalleryTab}
                          onChangeTab={tab => {this.setState({openGalleryTab: tab})}}
                        />
                      </Grid.Column>
                    ))}
                </TwoColumn>
                {listing.galleries && listing.galleries.length > numGalleriesPerPage && (
                  <Subsection>
                    <CustomPagination
                      {...{
                        activePage: this.state.activeGalleryPage,
                        totalPages: (listing.galleries.length + (listing.galleries.length % numGalleriesPerPage === 0 ? 0 : 1)) / numGalleriesPerPage,
                        onPageChange: (e, data) => {
                          this.setActiveGalleryPage(data.activePage);
                        },
                      }}
                    />
                  </Subsection>
                )}
                <Divider />
              </div>
            ))
          ) : (
            <h3 className="no-listing">You have no listings.</h3>
          )}
          {listings.count && listings.count > 1 && (
            <Subsection>
              <CustomPagination
                {...{
                  activePage: this.state.activePage,
                  totalPages: listings.count,
                  onPageChange: (e, data) => {
                    this.setActivePage(data.activePage);
                  },
                }}
              />
            </Subsection>
          )}
        </SubPageContent>
      </SubPageWrapper>
    );
  }
  setActiveGalleryPage(activeGalleryPage) {
    this.setState({activeGalleryPage})
  }
  setActivePage(activePage) {
    const parsed  = queryString.parse(this.props.location.search);
    parsed.listing_page = activePage;
    const path = `${this.props.location.pathname}?${queryString.stringify(parsed)}`;
    this.props.goTo({ path });
    this.setState({activePage});
    this.setActiveGalleryPage(1)
  }
  componentDidMount() {
    this.refreshListings();
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    let needRefresh = false;
    [LISTINGS.MODEL, GALLERIES.MODEL, FILES.MODEL, CATEGORIES.MODEL].forEach(
      model => {
        let prev = prevProps[DASHBOARD_VIEW][model].GET;
        let curr = this.props[DASHBOARD_VIEW][model].GET;
        if (!isEqual(prev, curr)) {
          needRefresh = true;
          this.setState({ openListingModal: null });
        }
        prev = prevProps[DASHBOARD_VIEW][model].POST;
        curr = this.props[DASHBOARD_VIEW][model].POST;
        if (!isEqual(prev, curr)) {
          needRefresh = true;
        }
        prev = prevProps[DASHBOARD_VIEW][model].DELETE;
        curr = this.props[DASHBOARD_VIEW][model].DELETE;
        if (!isEqual(prev, curr)) {
          needRefresh = true;
        }
      },
    );
    const { merchantId: prevMerchantId } = prevProps.user.LOAD_AUTH.data;
    const { merchantId } = this.props.user.LOAD_AUTH.data;
    if (prevMerchantId !== merchantId) {
      needRefresh = true;
    }
    const prevListingPage = queryString.parse(prevProps.location.search).listing_page
    const curListingPage = queryString.parse(this.props.location.search).listing_page

    if (prevListingPage !== curListingPage) {
      needRefresh = true;
    }

    if (needRefresh) {
      this.refreshListings();
    }
    if (this.state.opened === false) {
      const query = queryString.parse(this.props.location.search);
      if (query.open !== undefined && query.id !== undefined) {
        if ([LISTINGS.MODEL, GALLERIES.MODEL].indexOf(query.open) !== -1) {
          const queryId = parseInt(query.id, 10);
          switch (query.open) {
            case LISTINGS.MODEL:
              if (
                this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST.results.filter(
                  listing => listing.id === queryId,
                ).length === 1
              ) {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({ openListingModal: queryId, opened: true });
              }
              break;
            case GALLERIES.MODEL:
              if (
                this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST.results.filter(
                  listing =>
                    listing.galleries
                      .map(gallery => gallery.id)
                      .indexOf(queryId) !== -1,
                ).length === 1
              ) {
                const listingWithGallery = this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST.results.filter(
                  listing =>
                    listing.galleries
                      .map(gallery => gallery.id)
                      .indexOf(queryId) !== -1,
                )[0];
                const galleriesIdArray = listingWithGallery.galleries.map(gallery => gallery.id);
                const galleryIndex = galleriesIdArray.indexOf(queryId);
                const OneIndexed = galleryIndex + 1;
                const activeGalleryPage = Math.ceil(OneIndexed/numGalleriesPerPage);
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({ openGalleryModal: queryId, opened: true, activeGalleryPage });
              }
              break;
            default:
              break;
          }
        }
      }
    }
  }

  updateListing = ({ data, id }) => {
    this.props.dispatchAction({
      type: LISTINGS.PATCH.REQUESTED,
      payload: { data, id },
      contentType: MULTIPART_FORM_DATA,
    });
  };
  refreshListings = () => {
    const parsed  = queryString.parse(this.props.location.search);
    const activePage = parsed.listing_page || 1;
    this.setState({activePage})
    const { merchantId } = this.props.user.LOAD_AUTH.data;
    // const { merchantId } = { merchantId: 205 };
    if (merchantId) {
      this.props.dispatchAction({
        type: LISTINGS.LIST.REQUESTED,
        payload: {
          query: {
            merchant: merchantId,
            limit: numListingsPerPage,
            offset: (activePage - 1) * numListingsPerPage,
          },
          showSpinner: false,
        },
      });
    }
  };
}
