/* eslint-disable arrow-body-style */
/* eslint-disable no-else-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import v4 from 'uuid/v4';
import './conversation-profile.css';
import Avatar from '../../components/Base/Avatar';
import RatingStar from '../../components/Base/RatingStar';
import ListingLogoPlaceholder from '../../images/listing-logo-placeholder.jpg';
import LinkWrapper from '../../components/Base/Link';
import FaqSubsection from '../ProfessionalsPage/FaqSubsection';
// import GalleryCarouselFullWidth from '../../components/GalleryCarousel/GalleryCarouselFullWidth';
import {PROJECTS} from '../../actions/restApi';
import { CHAT_VIEW } from '../../reducers/chat';
import CardContent from '../../components/Base/Card/CardContent';
import Label from '../../components/Base/Label';

/* eslint-disable react/prefer-stateless-function */
export default class ConversationProfile extends React.PureComponent {
  static propTypes = {
    listing: PropTypes.object,
    handleHire: PropTypes.func,
    selectedChannel: PropTypes.object,
    dispatchAction: PropTypes.func,
    user: PropTypes.object,
    showHireButton: PropTypes.bool,
  };

  render() {
    const { listing, user } = this.props;
    // TODO: Remove when profile is connected to store
    if (!listing) return null;
    const { showHireButton } = this.props;
    const disableHire = this.props[CHAT_VIEW][PROJECTS.MODEL].GET.hired !== null;
    const hiredThisListing = this.props[CHAT_VIEW][PROJECTS.MODEL].GET.hired === listing.id;
    const loggedInUser = user.user && user.user.consumer.length > 0 ? 'consumer' : user.user && user.user.merchant.length > 0 ? 'merchant' : null
    if (loggedInUser === 'merchant') {
      return (
        <div className="conversation-profile">
          <LinkWrapper href={`/professionals/${listing.slug}`}>
            <Avatar src={listing.logo || ListingLogoPlaceholder} size={70} />
            <h3 style={{ margin: '12px' }}>{listing.name}</h3>
            <div className="review-wrapper">
              Review:{' '}
              <RatingStar
                maxRating={5}
                disabled
                defaultRating={
                  listing.reviews.length === 0
                    ? 0
                    : listing.reviews
                      .map(r => r.rating)
                      .reduce((a, b) => a + b, 0) / listing.reviews.length
                }
              />{' '}
              ({listing.reviews.length})
            </div>
          </LinkWrapper>
          {listing.address && (
            <div className="info-row">
              <div>
                <Icon className="mail" />Address
              </div>
              <div>{listing.address}</div>
            </div>
          )}
          {listing.phone && (
            <div className="info-row">
              <div>
                <Icon className="phone" />Phone Number
              </div>
              <div>{listing.phone}</div>
            </div>
          )}
          {listing.faq_data &&
          listing.faq_data.items &&
          listing.faq_data.items.length > 0 && (
            <div className="info-row" id="chat-faq">
              <FaqSubsection professional={listing}/>
            </div>
          )}
        </div>
      )
    }
    else if(loggedInUser === 'consumer') {
      return (
        <div className="conversation-profile">
          <LinkWrapper href={`/professionals/${listing.slug}`}>
            <Avatar src={listing.logo || ListingLogoPlaceholder} size={70} />
            <h3 style={{ margin: '12px' }}>{listing.name}</h3>
            <div className="review-wrapper">
              Review:{' '}
              <RatingStar
                maxRating={5}
                disabled
                defaultRating={
                  listing.reviews.length === 0
                    ? 0
                    : listing.reviews
                      .map(r => r.rating)
                      .reduce((a, b) => a + b, 0) / listing.reviews.length
                }
              />{' '}
              ({listing.reviews.length})
            </div>
          </LinkWrapper>
          <CardContent className="services-content">
            <span>Services: </span>
            {listing.categories_name &&
              listing.categories_name.length > 0 &&
              listing.categories_name.map(c => {
                return (
                  <div key={v4()} style={{ display: 'inline' }}>
                    {c && (
                      <Label color="rgb(225, 225, 225)">
                        {c.name}
                      </Label>
                      // <LinkWrapper key={v4()} href={`/services/${c.slug}`}>
                        
                      // </LinkWrapper>
                    )}
                  </div>
                )
              }
              )}
          </CardContent>
          {listing.email && (
            <div className="info-row">
              <div>
                <Icon className="mail" />Email
              </div>
              <div>{listing.email}</div>
            </div>
          )}
          {listing.phone && (
            <div className="info-row">
              <div>
                <Icon className="phone" />Phone Number
              </div>
              <div>{listing.phone}</div>
            </div>
          )}
          {listing.address && (
            <div className="info-row">
              <div>
                <Icon className="clock" />Address
              </div>
              <div>{listing.address}</div>
            </div>
          )}
          {listing.timing && (
            <div className="info-row">
              <div>
                <Icon className="clock" />Timing
              </div>
              <div>{listing.timing}</div>
            </div>
          )}
          {listing.faq_data &&
          listing.faq_data.items &&
          listing.faq_data.items.length > 0 && (
            <div className="info-row" id="chat-faq">
              <FaqSubsection professional={listing}/>
            </div>
          )}
          {showHireButton && this.props.user.LOAD_AUTH.data.consumerId > 0 && (
            <button
              className="hire-pro"
              onClick={() => {
                this.props.handleHire(listing.id);
              }}
              disabled={disableHire}
            >
              <Icon className="male" />
              {!disableHire && !hiredThisListing && 'Hire Pro for Project!'}
              {disableHire && hiredThisListing && 'Already Hired this Pro'}
              {disableHire && !hiredThisListing && 'Already Hired Another Pro'}
            </button>
          )}
        </div>
      );
    }
    else {
      return <div/>
    }
    
  }

  componentDidUpdate(prevProps) {
    const curData = JSON.parse(this.props.selectedChannel.data);
    const prevData = JSON.parse(prevProps.selectedChannel.data);
    if (curData && curData.projects && curData.projects.length > 0 &&
      prevData && prevData.projects && prevData.projects.length > 0) {
      if (curData.projects[curData.projects.length - 1] !== prevData.projects[prevData.projects.length - 1]) {
        this.props.dispatchAction({
          type: PROJECTS.GET.REQUESTED,
          payload: {
            id: curData.projects[curData.projects.length - 1],
          },
        })
      }
    }

  }
}
