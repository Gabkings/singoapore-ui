/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-danger,no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import QueryString from 'query-string';
import { isEqual } from 'lodash';
import v4 from 'uuid/v4';
import connect from 'react-redux/es/connect/connect';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import blogSaga from '../../../sagas/blog';
import { DAEMON } from '../../../utils/constants';
import blogReducer, { BLOG_VIEW } from '../../../reducers/blog';
// import LinkWrapper from '../../../components/Base/Link';

import Section from '../../../components/Section/Section';
import Subsection from '../../../components/Section/Subsection';
import ThreeColumn from '../../../components/Section/ThreeColumn';
import './styles.css';

import { WP_CATEGORIES, WP_POSTS } from '../../../actions/wpApi';
import PaperWrapper from '../../../components/Base/Paper';
import ImageWrapper from '../../../components/Base/Image';
import ButtonWrapper from '../../../components/Base/Button';
import LinkWrapper from '../../../components/Base/Link';

const POSTS_PER_PAGE = 14;

const mapDispatchToProps = dispatch => ({
  dispatchAction: (action, payload) => {
    dispatch({
      type: action,
      payload,
      view: BLOG_VIEW,
    });
  },
  goTo: path => {
    dispatch(push(path));
  },
});

const mapStateToProps = state => ({
  [BLOG_VIEW]: state.get(BLOG_VIEW).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: BLOG_VIEW,
  reducer: blogReducer,
});

const withSaga = injectSaga({
  key: `${BLOG_VIEW}`,
  saga: blogSaga,
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class ArticlesThreeColumnSubsection extends React.PureComponent {
  static propTypes = {
    // articles: PropTypes.array,
    dispatchAction: PropTypes.func,
    posts: PropTypes.array,
    // total: PropTypes.number,
    categories: PropTypes.array,
    location: PropTypes.object,
    search: PropTypes.string,
    // match: PropTypes.object,
    goTo: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    [BLOG_VIEW]: PropTypes.object,
  };
  componentDidMount() {
    if (this.props[BLOG_VIEW].categories.length === 0) {
      this.fetchCategories();
    } else {
      this.fetchPostsBasedOnParams();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(prevProps.location, this.props.location) ||
      !isEqual(
        prevProps[BLOG_VIEW].categories,
        this.props[BLOG_VIEW].categories,
      )
    ) {
      this.fetchPostsBasedOnParams();
    }
  }
  isNew = articleDate => {
    const thirtyDays = 2592000000;
    return new Date() - new Date(articleDate) < thirtyDays;
  };

  fetchPosts = query => {
    const fetchPostQuery = {
      per_page: POSTS_PER_PAGE,
      _embed: true,
      ...query,
    };
    if (query.categories) {
      fetchPostQuery.categories = this.getCategoryIdFromSlug(query.categories);
    }
    this.props.dispatchAction(WP_POSTS.LIST.REQUESTED, {
      query: fetchPostQuery,
    });
  };

  fetchCategories = () => {
    this.props.dispatchAction(WP_CATEGORIES.LIST.REQUESTED, {});
  };

  getCategoryIdFromSlug = slug => {
    if (!slug) return undefined;
    const { categories } = this.props[BLOG_VIEW];
    return (categories.find(category => category.slug === slug) || {}).id;
  };

  onPageChange = (e, value) => {
    const { page, categories } = this.getCurrentParams();
    if (page === value.activePage) return; // do not change if same page selected

    const query = {
      categories,
    };
    if (value.activePage !== 1) query.page = value.activePage; // only add page to query if page number is not 1
    const path = `${this.props.location.pathname}?${QueryString.stringify(
      query,
    )}`;
    this.props.goTo(path);
  };

  onCategoryChange = (e, value) => {
    const { categories = '' } = this.getCurrentParams();
    if (value.value === categories) return; // do not change if same category selected

    const query =
      value.value && value.value !== 'Select Category'
        ? { categories: value.value }
        : {};
    this.props.goTo(
      `${this.props.location.pathname}?${QueryString.stringify(query)}`,
    );
  };

  getCurrentParams = () => QueryString.parse(this.props.location.search);

  fetchPostsBasedOnParams = () => {
    const query = {};
    const { categories, page } = this.getCurrentParams();
    if (categories) query.categories = categories;
    if (page) query.page = page;
    this.fetchPosts(query);
  };

  render() {
    const { posts } = this.props[BLOG_VIEW];
    // let costGuideCategory = categories.map(category => {if(category.slug === 'cost-guides') return category})
    // costGuideCategory = costGuideCategory.filter(Boolean)
    // let costGuidesPosts = posts.map(post => {
    //   if(post.categories[0] === costGuideCategory[0].id)
    //     return post
    // })
    // costGuidesPosts = costGuidesPosts.filter(Boolean)
    
    const dangerouslyRender = content => ({
      __html: content,
    });
    const renderPost = post => (
      <Grid.Column
        key={v4()}
        style={{ marginTop: '25px' }}
        className="article_box"
      >
        {this.isNew(post.date) && <div className="new-article-label">New</div>}
        <PaperWrapper
          className="articles-paper"
          style={{ borderRadius: '0px', paddingBottom: '30px' }}
          onClick={() => {
            this.props.goTo(`/articles/${post.slug}`);
          }}
        >
          <ImageWrapper
            src={
              post &&
              post._embedded &&
              post._embedded['wp:featuredmedia'] &&
              post._embedded['wp:featuredmedia'].length > 0
                ? post._embedded['wp:featuredmedia'][0].source_url
                : 'https://via.placeholder.com/250'
            }
          />
          <Subsection>
            <h3
              dangerouslySetInnerHTML={dangerouslyRender(post.title.rendered)}
            />
            <div
              className="card-excerpt"
              dangerouslySetInnerHTML={dangerouslyRender(
                `${post.excerpt.rendered.slice(0, 200)}...`,
              )}
            />
          </Subsection>
        </PaperWrapper>
      </Grid.Column>
    );
    return (
      <Section>
        <Subsection>
          <h2>Our Articles:</h2>
          <ThreeColumn stackable relaxed centered padded>
            {posts && posts.map(post => renderPost(post))}
          </ThreeColumn>
          <LinkWrapper href="/articles">
            <ButtonWrapper design="filled">View All</ButtonWrapper>
          </LinkWrapper>
        </Subsection>
      </Section>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(ArticlesThreeColumnSubsection);
