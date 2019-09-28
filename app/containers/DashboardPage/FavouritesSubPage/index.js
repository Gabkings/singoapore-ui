/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import CompanyList from '../../../components/CompanyList';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';
import { CONSUMERS, FAVOURITES } from '../../../actions/restApi';
import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import GalleryCarouselFullWidth from '../../../components/GalleryCarousel/GalleryCarouselFullWidth';
import FavoriteButton from '../../../components/CustomButton/FavoriteButton';
import './styles.css';
/* eslint-disable react/prefer-stateless-function */
export default class FavouritesSubPage extends React.PureComponent {
  static propTypes = {
    currentTab: PropTypes.string,
    dispatchAction: PropTypes.func.isRequired,
    // [DASHBOARD_VIEW]: PropTypes.object,
    user: PropTypes.object.isRequired,
    goTo: PropTypes.func,
  };
  render() {
    const { currentTab } = this.props;
    const favourites = this.props[DASHBOARD_VIEW][FAVOURITES.MODEL].LIST;
    const companies = {
      results: favourites.results
        ? favourites.results
          .filter(favourite => favourite.listing !== null)
          .map(favourite => favourite.listing)
        : [],
    };
    const galleries = favourites.results
      .filter(favourite => favourite.gallery !== null)
      .map(favourite => favourite.gallery);
    return (
      <SubPageWrapper
        currentTab={currentTab}
        tabTitle="Favourites"
        tabLink="favourites"
      >
        <SubPageDescription>All your favourited listings and galleries can be found here.</SubPageDescription>
        <SubPageContent>
          {companies.results.length > 0 &&
            <CompanyList
              companies={companies}
              dispatchAction={this.props.dispatchAction}
              user={this.props.user}
              goTo={this.props.goTo}
            />
          }
          {galleries.map(gallery => (
            <div key={v4()}>
              <div className="gallery-single">
                <GalleryCarouselFullWidth
                  gallery={gallery}
                  images={gallery.files.map(file => ({
                    src: file.file_field,
                    alt: file.name,
                  }))}/>
                <div className="favourite-wrapper">
                  {this.props.user.isLoggedIn &&
                  this.props.user.LOAD_AUTH.data.consumerId !== null && (
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
                                gallery_slug: gallery.slug,
                              },
                            },
                          });
                        },
                      }}
                      iconProps={{}}
                      isFavourite={
                        this.props.user[CONSUMERS.MODEL].favourite_galleries &&
                        this.props.user[
                          CONSUMERS.MODEL
                        ].favourite_galleries.indexOf(gallery.slug) !== -1
                      }
                    />
                  )}
                </div>
                <button
                  className="gallery-single-text"
                  style={{ width: '100%', margin: '8px auto', cursor: 'pointer' }}
                  onClick={() => {
                    this.props.goTo({ path: `/gallery/${gallery.slug}` });
                  }}
                >
                  <h4>{gallery.wp_post_title}</h4>
                  <p>{gallery.listing_name}</p>
                </button>
              </div>
            </div>
          ))}
          {companies.results.length === 0 && <p>No Favourites Found</p>}
        </SubPageContent>
      </SubPageWrapper>
    );
  }
  componentDidMount() {
    this.props.dispatchAction({
      type: FAVOURITES.LIST.REQUESTED,
      payload: {
        query: {
          consumer: this.props.user.LOAD_AUTH.data.consumerId,
        },
      },
    });
  }
  // componentDidUpdate(prevProps,prevState,snapshot) {
  //   if (prevProps[DASHBOARD_VIEW][FAVOURITE.MODEL].LIST.results !== this.props[DASHBOARD_VIEW][FAVOURITE.MODEL].LIST.results) {
  //
  //   }
  // }
}
