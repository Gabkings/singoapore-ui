/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Modal } from 'semantic-ui-react';
import queryString from 'query-string';
import TwoColumn from '../../../components/Section/TwoColumn';
import Subsection from '../../../components/Section/Subsection';
import OneColumn from '../../../components/Section/OneColumn';
import Divider from '../../../components/Base/Divider';
import PaperWrapper from '../../../components/Base/Paper';
import ButtonWrapper from '../../../components/Base/Button';
import './styles.css';
import ListingModal from './ListingModal';
import {
  CATEGORIES,
  CONSUMERS,
  GALLERIES,
  LISTINGS,
  DEALS,
  USERS,
  MERCHANTS,
} from '../../../actions/restApi';
import Avatar from '../../../components/Base/Avatar';
import { MULTIPART_FORM_DATA } from '../../../utils/actionsUtil';
import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import GalleryModal from './GalleryModal';
import FilesModal from './FilesModal';
import LinkWrapper from '../../../components/Base/Link';

/* eslint-disable react/prefer-stateless-function */
export default class ProfilePaper extends React.PureComponent {
  static propTypes = {
    // profile: PropTypes.object,
    currentTab: PropTypes.string,
    history: PropTypes.object,
    user: PropTypes.object,
    location: PropTypes.object,
    // [DASHBOARD_VIEW]: PropTypes.object,
    goTo: PropTypes.func,
    dispatchAction: PropTypes.func.isRequired,
    dashboardTabs: PropTypes.array,
  };
  state = {
    openListingModal: false,
    openGalleryModal: false,
    openSuccessModal: false,
    successModalText: '',
    successModelId: undefined,
    successModel: '',
    openGalleryTab: 'details',
  };
  render() {
    const { currentTab, user, dashboardTabs } = this.props;
    const {
      openListingModal,
      openGalleryModal,
      openSuccessModal,
      successModalText,
    } = this.state;
    const dashboardTabJsx = dashboardTabs
      .map(item => (
        <a
          className={`item ${currentTab === item.link ? 'active' : ''}`}
          key={item.name}
          href="/#" // this is a hack to apply the link styling without having to redo the css
          onClick={e => {
            e.preventDefault();
            this.props.history.push(`/dashboard/${item.link}`);
          }}
        >
          <div className="menu-item">{item.name}</div>
        </a>
      ));
    return (
      <PaperWrapper className='paper'>
        <TwoColumn className="profile-summary">
          <Grid.Column width={4}>
            <Subsection className="profile-avatar">
              <FilesModal
                modalProps={{
                  dimmer: 'inverted',
                  trigger: (
                    <button style={{ cursor: 'pointer' }}>
                      {this.props.user.user.profile_image && (
                        <Avatar
                          src={this.props.user.user.profile_image}
                          size={150}
                          borderWidth={5}
                          style={{
                            display: 'block',
                          }}
                        />
                      )}
                      {!this.props.user.user.profile_image && (
                        <Avatar
                          src={`https://ui-avatars.com/api/?${queryString.stringify(
                            {
                              name: this.props.user.user.long_first_name,
                            },
                          )}`}
                          size={150}
                          borderWidth={5}
                          style={{
                            display: 'block',
                          }}
                        />
                      )}
                    </button>
                  ),
                }}
                formProps={{
                  onSubmit: formData => {
                    this.props.dispatchAction({
                      type: USERS.PATCH.REQUESTED,
                      payload: { data: formData, id: this.props.user.user.id },
                      contentType: MULTIPART_FORM_DATA,
                    });
                  },
                }}
                file={{
                  file_field: this.props.user.user.profile_image,
                }}
                fieldName="profile_image"
                isCreated={false}
              />
            </Subsection>
          </Grid.Column>
          <Grid.Column
            className="profile-summary"
            width={12}
            verticalAlign="middle"
          >
            <TwoColumn>
              <Grid.Column width={10}>
                <Subsection style={{ textAlign: 'left' }}>
                  <h1>Hello, {this.props.user.user.long_first_name}</h1>
                  {/* {this.props.user.LOAD_AUTH.data.consumerId > 0 && (
                    <LinkWrapper href="/dashboard/projects">
                      <h4>
                        {
                          this.props[DASHBOARD_VIEW][CONSUMERS.MODEL].GET
                            .num_projects
                        }{' '}
                        Projects
                      </h4>
                    </LinkWrapper>
                  )} */}
                  {this.props.user.LOAD_AUTH.data.merchantId > 0 &&
                  this.props.user.user.enable_chat && (
                    <LinkWrapper href="/dashboard/deals">
                      <h4>
                        {this.props[DASHBOARD_VIEW][DEALS.MODEL].LIST.count}{' '}
                        Deal{this.props[DASHBOARD_VIEW][DEALS.MODEL].LIST
                          .count > 1 && 's'}
                        {' | '}
                        $ {this.props[DASHBOARD_VIEW][MERCHANTS.MODEL].GET.credits}{' '}
                        {this.props[DASHBOARD_VIEW][MERCHANTS.MODEL].GET.credits_updated && `(Updated ${this.props[DASHBOARD_VIEW][MERCHANTS.MODEL].GET.credits_updated})`}
                      </h4>
                    </LinkWrapper>
                  )}
                </Subsection>
              </Grid.Column>
              <Grid.Column width={6}>
                <Subsection
                  style={{
                    display:
                      user.LOAD_AUTH.data.merchantId !== -1 &&
                      user.LOAD_AUTH.data.merchantId !== null
                        ? 'inherit'
                        : 'none',
                  }}
                >
                  <ListingModal
                    modalProps={{
                      dimmer: 'inverted',
                      closeOnDimmerClick: false,
                      trigger: (
                        <ButtonWrapper
                          design="outline"
                          style={{ margin: '10px' }}
                          onClick={() => {
                            this.setState({ openListingModal: true });
                          }}
                        >
                          Add Listing
                        </ButtonWrapper>
                      ),
                      open: openListingModal,
                      onClose: () => {
                        this.setState({ openListingModal: false });
                      },
                    }}
                    formProps={{
                      onSubmit: formData => {
                        // const data = new FormData(formData.target);
                        const data = formData;
                        data.append(
                          'merchant',
                          this.props.user.LOAD_AUTH.data.merchantId,
                        );
                        this.createListing({ data });
                      },
                    }}
                    categories={
                      this.props[DASHBOARD_VIEW][CATEGORIES.MODEL].LIST
                    }
                    listing={null}
                    isCreate
                    error={
                      this.props[DASHBOARD_VIEW][LISTINGS.MODEL].POST.error
                    }
                  />
                  <Modal
                    open={openSuccessModal}
                    onClose={() =>
                      this.setState({
                        openSuccessModal: false,
                        successModalText: '',
                      })
                    }
                  >
                    <Subsection>
                      <h3>{successModalText}</h3>
                      <ButtonWrapper
                        design="filled"
                        onClick={() => {
                          const parsed = {
                            open: this.state.successModel,
                            id: this.state.successModelId,
                          };
                          // eslint-disable-next-line camelcase
                          const { listing_page } = queryString.parse(this.props.location.search);
                          // eslint-disable-next-line camelcase
                          parsed.listing_page = listing_page;
                          const path = `${this.props.location.pathname}?${queryString.stringify(parsed)}`;
                          window.location = path
                        }}
                      >
                        EDIT
                      </ButtonWrapper>
                    </Subsection>
                  </Modal>
                  <GalleryModal
                    modalProps={{
                      dimmer: 'inverted',
                      closeOnDimmerClick: false,
                      trigger: (
                        <ButtonWrapper
                          design="outline"
                          style={{ margin: '10px' }}
                          onClick={() => {
                            this.setState({ openGalleryModal: true });
                          }}
                        >
                          Add Project
                        </ButtonWrapper>
                      ),
                      open: openGalleryModal,
                      onClose: () => {
                        this.setState({ openGalleryModal: false });
                      },
                    }}
                    formProps={{
                      onSubmit: formData => {
                        const data = formData;
                        this.props.dispatchAction({
                          type: GALLERIES.POST.REQUESTED,
                          payload: {
                            data,
                          },
                        });
                      },
                    }}
                    listings={this.props[DASHBOARD_VIEW][LISTINGS.MODEL].LIST}
                    isCreate
                    error={
                      this.props[DASHBOARD_VIEW][GALLERIES.MODEL].POST.error
                    }
                    activeItem={this.state.openGalleryTab}
                    onChangeTab={tab => {this.setState({openGalleryTab: tab})}}
                  />
                </Subsection>
              </Grid.Column>
            </TwoColumn>
          </Grid.Column>
        </TwoColumn>
        <Divider className="profile-divider" />
        <OneColumn className="profile-summary-nav">
          <Subsection style={{ paddingTop: 0, marginTop: 0 }}>
            <div className="ui secondary menu">{dashboardTabJsx}</div>
          </Subsection>
        </OneColumn>
      </PaperWrapper>
    );
  }
  componentDidMount() {
    this.props.dispatchAction({
      type: CATEGORIES.LIST.REQUESTED,
      payload: {
        query: {
          limit: 300,
        },
      },
    });
    this.props.dispatchAction({
      type: DEALS.LIST.REQUESTED,
      payload: {
        query: {
          merchant: this.props.user.LOAD_AUTH.data.merchantId,
        },
      },
    });
    this.props.dispatchAction({
      type: MERCHANTS.GET.REQUESTED,
      payload: {
        id: this.props.user.LOAD_AUTH.data.merchantId,
      },
    });
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps[DASHBOARD_VIEW][LISTINGS.MODEL].POST.id !==
      this.props[DASHBOARD_VIEW][LISTINGS.MODEL].POST.id
    ) {
      if (this.props[DASHBOARD_VIEW][LISTINGS.MODEL].POST.id !== undefined) {
        // SUCCESS
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          openListingModal: false,
          openSuccessModal: true,
          successModalText:
            'Your Listing is successfully created, You may now edit your FAQ, listing options and add images',
          successModel: LISTINGS.MODEL,
          successModelId: this.props[DASHBOARD_VIEW][LISTINGS.MODEL].POST.id,
        });
      }
    }
    if (
      prevProps[DASHBOARD_VIEW][GALLERIES.MODEL].POST.id !==
      this.props[DASHBOARD_VIEW][GALLERIES.MODEL].POST.id
    ) {
      if (this.props[DASHBOARD_VIEW][GALLERIES.MODEL].POST.id !== undefined) {
        // SUCCESS
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          openGalleryModal: false,
          openSuccessModal: true,
          successModalText:
            'Your Gallery is successfully created, You may now add images',
          successModel: GALLERIES.MODEL,
          successModelId: this.props[DASHBOARD_VIEW][GALLERIES.MODEL].POST.id,
        });
      }
    }
    const { user } = this.props;
    const isConsumer =
      user.LOAD_AUTH &&
      user.LOAD_AUTH.data.consumerId !== null &&
      user.LOAD_AUTH.data.consumerId !== 0 &&
      user.LOAD_AUTH.data.consumerId !== undefined &&
      user.LOAD_AUTH.data.consumerId !== -1;
    if (isConsumer) {
      // eslint-disable-next-line camelcase
      const pending_form_submissions = user.user.pending_form_submissions || []
      if (pending_form_submissions.length > 0) {
        this.props.goTo({path: '/dashboard/projects/create'})
      }
    }

  }
  createListing = payload => {
    this.props.dispatchAction({
      type: LISTINGS.POST.REQUESTED,
      payload,
      contentType: MULTIPART_FORM_DATA,
    });
  };
}
