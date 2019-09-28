/* eslint-disable prettier/prettier */
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import queryString from 'query-string';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { CATEGORIES, CONSUMERS, GALLERIES, USERS } from '../../actions/restApi';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import './voucher-page.css';
import galleryReducer, { GALLERY_VIEW } from '../../reducers/gallery';
import VouchersSearch from './VouchersSearch';
import GalleryCarouselFullWidth from '../../components/GalleryCarousel/GalleryCarouselFullWidth';
import FavoriteButton from '../../components/CustomButton/FavoriteButton';
import CustomPagination from '../../components/CustomPagination';
import Subsection from '../../components/Section/Subsection';
import PaginationHelmet from '../../components/Helmet/PaginationHelmet';
import Loader from '../Common/Loader';



const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: GALLERY_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [GALLERY_VIEW]: state.get(GALLERY_VIEW).toJS(),
  user: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: GALLERY_VIEW,
  reducer: galleryReducer,
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

const PAGE_LIMIT = 12;

/* eslint-disable react/prefer-stateless-function */
class GalleryPage extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    [GALLERY_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func,
    goTo: PropTypes.func,
    galleries: PropTypes.array,
    user: PropTypes.object,
    location: PropTypes.object,
  };

  fetchCategories = () => {
    this.props.dispatchAction({
      type: CATEGORIES.LIST.REQUESTED,
      payload: {
        query: {
          limit: 300,
          in_gallery: true,
        },
        showSpinner: false,
      },
    });
  };

  fetchGalleries = query => {
    this.props.dispatchAction({
      type: GALLERIES.LIST.REQUESTED,
      payload: {
        query: {...query, exclude_inactive: 'true'},
      },
    });
  };
  goToPage(pageNumber) {
    const limit = PAGE_LIMIT;
    const offset = Math.max((pageNumber - 1) * PAGE_LIMIT, 0);
    const query = queryString.stringify({
      ...queryString.parse(this.props.location.search),
      limit,
      offset: offset === 0 ? '' : offset,
    });
    const target = `${this.props.location.pathname}?${query}`;
    this.props.goTo({ path: target });
  }
  onApplyFilter = filter => {
    const { search, categories } = filter;
    const filterQuery = {};
    filterQuery.search = search || undefined;
    filterQuery.categories = (categories && categories.join(',')) || undefined;
    const query = queryString.stringify({
      offset: 0,
      limit: PAGE_LIMIT,
      ...filterQuery,
    });
    const target = `${this.props.location.pathname}?${query}`;
    this.props.goTo({ path: target });
  };

  componentDidMount() {
    this.fetchCategories();
    // TODO: uncomment out when removing stub data
    this.fetchGalleries({
      limit: PAGE_LIMIT,
      ...queryString.parse(this.props.location.search),
    });
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (this.props.location.search !== prevProps.location.search) {
      this.fetchGalleries({
        limit: PAGE_LIMIT,
        ...queryString.parse(this.props.location.search),
        exclude_inactive: 'true',
      });
    }
  }

  render() {
    const { galleries = {}, categories } = this.props[GALLERY_VIEW];
    const query = queryString.parse(this.props.location.search);
    const pageNumber =
      query.offset && query.limit ? query.offset / query.limit + 1 : 1;

    const renderGallery = gallery => {
      const imagesData = gallery.files.map(file => ({
        src: file.thumbnail || file.file_field,
        alt: file.name,
      }));
      return (
        <Grid.Column key={v4()} computer={5} tablet={8} mobile={16}>
          <div className="voucher-single">
            <GalleryCarouselFullWidth gallery={gallery} images={imagesData} />
            <div className="favourite-wrapper">
              {this.props.user.isLoggedIn &&
                this.props.user.LOAD_AUTH.data.consumerId !== null && (
                <FavoriteButton
                  buttonProps={{
                    className: 'voucher-favourite',
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
              className="voucher-single-text"
              style={{ width: '100%', margin: '8px auto', cursor: 'pointer' }}
              onClick={() => {
                this.props.goTo({ path: `/gallery/${gallery.slug}` });
              }}
            >
              <h3>{gallery.wp_post_title}</h3>
              <p>{gallery.listing_name}</p>
            </button>
          </div>
        </Grid.Column>
      );
    };

    return (
      <TemplatePage {...this.props}>
        <div className="vouchers-page">
          <h1>Gallery</h1>
          <h2>Browse Home Projects here</h2>
          <Grid className="vouchers-grid" padded centered>
            <Grid.Row>
              <Grid.Column width={16}>
                <VouchersSearch
                  categoryOptions={categories.results}
                  onApplyFilter={this.onApplyFilter}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {!galleries.requesting && galleries.results !== undefined && galleries.results.length > 0 && (
                galleries.results.map(gallery => renderGallery(gallery))
              )}
              {!galleries.requesting && galleries.results !== undefined && galleries.results.length === 0 && (
                <h2>No galleries found.</h2>
              )}
              {galleries.requesting && <Loader/>}
            </Grid.Row>
          </Grid>
          <Subsection>
            <CustomPagination
              activePage={pageNumber}
              totalPages={Math.ceil(galleries.count / PAGE_LIMIT)}
              onPageChange={(e, data) => {
                this.goToPage(data.activePage);
              }}
            />
            <PaginationHelmet location={this.props.location} pageLimit={PAGE_LIMIT} pageNumber={pageNumber} totalPages={Math.ceil(galleries.count / PAGE_LIMIT)}/>
          </Subsection>
        </div>
      </TemplatePage>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withCategorySaga,
  withGallerySaga,
  withConnect,
)(GalleryPage);
