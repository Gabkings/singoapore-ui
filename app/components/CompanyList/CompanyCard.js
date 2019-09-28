/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import StarRatings from 'react-star-ratings';
import ImageWrapper from '../Base/Image';
import Card from '../Base/Card/Card';
import CardContent from '../Base/Card/CardContent';
// import RatingStar from '../Base/RatingStar';
import FavoriteButton from '../CustomButton/FavoriteButton';
import ChatNowButton from '../CustomButton/ChatNowButton';
import { CONSUMERS } from '../../actions/restApi';
import ListingLogoPlaceholder from '../../images/listing-logo-placeholder.jpg';

function stripHtml(html) {
  // Create a new div element
  const temporalDivElement = document.createElement("div");
  // Set the HTML content with the providen
  temporalDivElement.innerHTML = html;
  // Retrieve the text property of the element (cross-browser support)
  return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

function CompanyCard(props) {
  const {
    company,
    onSelect,
    selected,
    selectable,
    goTo,
    user,
    dispatchAction,
    hideChatButton,
    hideRating,
    showForm,
    ...cardProps
  } = props;

  let averageReview = 0
  let companyReviews = []
  if(company.reviews.length > 0) {
    companyReviews = company.reviews.map(review => review.rating)
    // companyReviews = [1,2,3,4,4.9,4.3,4.9] --> just for test , not required
    const totalReviews = companyReviews.reduce((a, b) => a + b, 0)
    averageReview = totalReviews / companyReviews.length
    averageReview = Math.floor(averageReview * 10) / 10
  }
  return (
    <Card
      {...cardProps}
      className={`company-card ${selectable &&
        selected.indexOf(company.id) !== -1 &&
        'selected'}`}
      onClick={() => {
        if (onSelect) {
          onSelect(company);
        }
      }}
    >
      <CardContent>
        <Grid columns={3} container>
          <Grid.Row>
            <Grid.Column width={3}>
              <div className="logo-wrapper">
                <Link
                  href
                  to={selectable ? '#' : `/professionals/${company.slug}`}
                >
                  {company.logo && (
                    <ImageWrapper
                      src={company.logo}
                      height="150px"
                      width="228px"
                      style={{
                        objectFit: 'contain',
                        borderRadius: '5px',
                      }}
                      alt={company.slug}
                      title={company.slug}

                    />
                  )}
                  {!company.logo && (
                    <ImageWrapper
                      src={ListingLogoPlaceholder}
                      height="150px"
                      width="228px"
                      style={{
                        objectFit: 'contain',
                        borderRadius: '5px',
                      }}
                      title={ListingLogoPlaceholder}
                      alt={ListingLogoPlaceholder}
                    />
                  )}
                </Link>
              </div>
            </Grid.Column>
            <Grid.Column
              computer={9}
              tablet={12}
              mobile={12}
              style={{ padding: '16px 8px' }}
            >
              <div style={{ textAlign: 'left' }}>
                {
                  user.isLoggedIn &&
                  user[CONSUMERS.MODEL] &&
                  user[CONSUMERS.MODEL].favourite_listings && (
                    <FavoriteButton
                      buttonProps={{
                        style: {
                          float: 'right',
                          boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.09)',
                          marginLeft: '4px',
                          display: selectable ? 'none' : 'inherit',
                        },
                        onClick: () => {
                          dispatchAction({
                            type: CONSUMERS.POST.REQUESTED,
                            payload: {
                              id: user[CONSUMERS.MODEL].id,
                              url: 'favourite',
                              data: {
                                listing_slug: company.slug,
                              },
                            },
                          });
                        },
                      }}
                      iconProps={{}}
                      isFavourite={user[CONSUMERS.MODEL].favourite_listings && user[CONSUMERS.MODEL].favourite_listings.indexOf(company.slug) !== -1}
                    />
                  )
                }
                <Link
                  href
                  to={selectable ? '#' : `/professionals/${company.slug}`}
                >
                  <h3>{company.name}</h3>
                </Link>
                <p>
                  {stripHtml(`${company.about_rich_text.slice(0, 250)}...`)}
                </p>
              </div>
            </Grid.Column>
            <Grid.Column
              computer={4}
              tablet={16}
              mobile={16}
              style={{ padding: '16px 8px 0px 8px' }}
            >
              <Grid>
                <Grid.Column computer={16} tablet={8} mobile={8} className="myChat" >
                  {!hideChatButton && company.chat_activated && (
                    <div style={{ marginBottom: '20px' }}>
                      <ChatNowButton
                        buttonProps={{
                          fluid: 'true',
                          display: selectable ? 'none' : 'inherit',
                        }}
                        onClick={showForm}
                      // onClick={() => {
                      //   goTo({path: encodeURI(`/dashboard/chat?listing=${company.slug}`)});
                      // }}
                      />
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column computer={16} tablet={8} mobile={8} className="myRating">
                  {!hideRating && (
                    <div className="rating-wrapper">
                      {company.reviews.length === 0 && (
                        // <RatingStar
                        //   size="huge"
                        //   maxRating={5}
                        //   defaultRating={0}
                        //   disabled
                        // />
                        <span className="star-rating-wrapper">
                          <StarRatings
                            rating={0}
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="rgb(255, 177, 0)"
                            starEmptyColor="rgb(0,0,0,0.15)"
                          />
                        </span>
                      )}
                      {company.reviews.length > 0 && (
                        // <RatingStar
                        //   size="huge"
                        //   maxRating={5}
                        //   defaultRating={
                        //     company.reviews
                        //       .map(r => r.rating)
                        //       .reduce((a, b) => a + b, 0) / company.reviews.length
                        //   }
                        //   disabled
                        // />
                        <span className="star-rating-wrapper">
                          <StarRatings
                            rating={averageReview}
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="rgb(255, 177, 0)"
                            starEmptyColor="rgb(0,0,0,0.15)"
                          />
                        </span>
                      )}
                      <span>({company.reviews.length})</span>
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </CardContent>
    </Card>
  );
}

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.array,
  selectable: PropTypes.bool,
  goTo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  dispatchAction: PropTypes.func.isRequired,
  hideChatButton: PropTypes.bool,
  hideRating: PropTypes.bool,
  users: PropTypes.object,
  showForm: PropTypes.func,
};

export default CompanyCard;

