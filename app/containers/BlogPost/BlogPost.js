/* eslint-disable react/no-danger,no-underscore-dangle */
import React from 'react';
import { Grid, Icon, Card } from 'semantic-ui-react';
import connect from 'react-redux/es/connect/connect';
import { isEqual } from 'lodash';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import v4 from 'uuid/v4';
import Disqus from 'disqus-react';
import renderHTML from 'react-render-html';
import TemplatePage from '../Common/PageWrapper';
import ImageBannerSection from '../../components/Section/ImageBannerSection';
import Subsection from '../../components/Section/Subsection';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { DAEMON } from '../../utils/constants';
import './blog-post.css';
import blogPostReducer, { BLOG_POST_VIEW } from '../../reducers/blogPost';
import blogSaga from '../../sagas/blog';
import { WP_CATEGORIES, WP_POSTS } from '../../actions/wpApi';
// import CustomPagination from '../../components/CustomPagination';
import GetMatchedPaper from '../../components/GetMatchedPaper/GetMatchedPaper';
import SubscribePaper from '../../components/SubscribePaper/SubscribePaper';
import LinkWrapper from '../../components/Base/Link';
import ImageWrapper from '../../components/Base/Image';
import ThreeColumn from '../../components/Section/ThreeColumn';

import { disqusShortName } from '../../utils/disqus';
import { WEB_URL } from '../../utils/api';
import NotFoundSection from '../NotFoundPage/NotFoundSection';
import Loader from '../Common/Loader';

const mapDispatchToProps = dispatch => ({
  dispatchAction: (action, payload) => {
    dispatch({
      type: action,
      payload,
      view: BLOG_POST_VIEW,
    });
  },
});

const mapStateToProps = state => ({
  [BLOG_POST_VIEW]: state.get(BLOG_POST_VIEW).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: BLOG_POST_VIEW,
  reducer: blogPostReducer,
});

const withSaga = injectSaga({
  key: `${BLOG_POST_VIEW}`,
  saga: blogSaga,
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class BlogPost extends React.Component {
  static propTypes = {
    dispatchAction: PropTypes.func,
    post: PropTypes.object,
    posts: PropTypes.array,
    match: PropTypes.object,
    location: PropTypes.object,
    // eslint-disable-next-line react/no-unused-prop-types
    [BLOG_POST_VIEW]: PropTypes.object,
  };

  fetchPost = () => {
    this.props.dispatchAction(WP_POSTS.GET.REQUESTED, {
      query: {
        slug: this.props.match.params.slug,
        _embed: true,
      },
    });
  };

  fetchRecentPosts = () => {
    if (!this.props[BLOG_POST_VIEW].post) return;

    this.props.dispatchAction(WP_POSTS.LIST.REQUESTED, {
      query: {
        per_page: 3,
        order: 'desc',
        orderby: 'date',
        _embed: true,
        exclude: this.props[BLOG_POST_VIEW].post.id,
      },
    });
  };

  fetchRelatedPosts = () => {
    if (!this.props[BLOG_POST_VIEW].post) return;

    const searchTerms = this.props[BLOG_POST_VIEW].post.slug
      .split('-')
      .join(',');
    const commonQuery = {
      per_page: 3,
      _embed: true,
      exclude: this.props[BLOG_POST_VIEW].post.id,
    };
    this.props.dispatchAction(WP_POSTS.RELATED_BY_SLUG.REQUESTED, {
      query: {
        ...commonQuery,
        search: searchTerms,
      },
    });
    const relatedKeys = {
      tags: WP_POSTS.RELATED_BY_TAG,
      categories: WP_POSTS.RELATED_BY_CATEGORY,
    };
    Object.keys(relatedKeys).forEach(key => {
      const ids = this.props[BLOG_POST_VIEW].post[key];
      const idsJoined = ids && ids.length ? ids.join(',') : null;
      this.props.dispatchAction(relatedKeys[key].REQUESTED, {
        query: {
          ...commonQuery,
          [key]: idsJoined,
        },
      });
    });
  };

  fetchCategories = () => {
    this.props.dispatchAction(WP_CATEGORIES.LIST.REQUESTED, {});
  };

  componentDidMount() {
    this.fetchPost();
    this.fetchCategories();
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(prevProps[BLOG_POST_VIEW].post, this.props[BLOG_POST_VIEW].post)
    ) {
      this.fetchRecentPosts();
      this.fetchRelatedPosts();
    }
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      this.fetchPost();
      this.fetchCategories();
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      // comments,
      post,
      categories,
      posts: recentPosts,
      relatedByTags,
      relatedByCategories,
      relatedBySlug,
    } = this.props[BLOG_POST_VIEW];
    if (typeof post === 'string' || post === undefined)
      return (
        <TemplatePage {...this.props}>
          <NotFoundSection />
        </TemplatePage>
      );
    if (post === null)
      return (
        <TemplatePage {...this.props}>
          <Loader />
        </TemplatePage>
      );
    // const headingArray = post.content.rendered.match(/<h(.)>.*?<\/h\1>/g);
    const {
      author,
      'wp:featuredmedia': featuredMedia,
      'wp:term': term,
    } = post._embedded;

    const dangerouslyRender = content => ({
      __html: content,
    });

    const allRelatedPosts = relatedBySlug
      .concat(relatedByTags)
      .concat(relatedByCategories);

    const disqusShortname = disqusShortName;
    const disqusConfig = {
      url: `${WEB_URL}${this.props.location.pathname}`,
      identifier: this.props.match.params.slug,
      title: post.title.rendered,
    };
    return (
      <TemplatePage {...this.props}>
        <div className="blog-navigator">
          <div>
            <a href="/articles">Blogs</a>
          </div>
          <div>{renderHTML(post.title.rendered)}</div>
        </div>
        <ImageBannerSection
          imageSource={featuredMedia && featuredMedia.length > 0 && featuredMedia[0].source_url}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="blog-image-overlay" />
          <Subsection>
            <h1 className="blog-title">{renderHTML(post.title.rendered)}</h1>
            <h2 className="blog-date">
              {moment(post.date).format('MMMM Do, YYYY')}
            </h2>
          </Subsection>
        </ImageBannerSection>
        <Grid className="blog-post" stackable padded relaxed>
          <Grid.Row>
            <Grid.Column mobile={16} computer={11}>
              <Card fluid className="blog-post-card">
                <Card.Content>
                  {/* <Card.Header className="blog-post-header">
                    <h2
                      dangerouslySetInnerHTML={dangerouslyRender(
                        post.title.rendered,
                      )}
                    />
                      </Card.Header> */}
                  {/* <Card.Meta className="blog-post-meta">
                    <span>By: {author[0].name}</span>
                    <span>
                      <Icon
                        className="conversation"
                        style={{ marginRight: '4px' }}
                      />
                      <Disqus.CommentCount
                        shortname={disqusShortname}
                        config={{
                          ...disqusConfig,
                          url: `${disqusConfig.url}#disqus_thread`,
                        }}
                      />
                    </span>
                      </Card.Meta> */}
                  {/* <div className="blog-post-image">
                    <ImageWrapper src={featuredMedia[0].source_url} />
                      </div> */}
                  {/* {headingArray && headingArray.length > 0 && 
                    headingArray.map(heading => <div
                      dangerouslySetInnerHTML={dangerouslyRender(
                        heading,
                      )}
                    />)
                  } */}
                  <div className="blog-post-content">
                    <div
                      dangerouslySetInnerHTML={dangerouslyRender(
                        post.content.rendered,
                      )}
                    />
                  </div>
                </Card.Content>
                <Card.Content extra className="blog-post-footer">
                  <span>
                    Filed under:{' '}
                    {term[0].map(category => (
                      <LinkWrapper
                        key={category.slug}
                        href={`/articles?categories=${category.slug}`}
                      >
                        {category.name}
                      </LinkWrapper>
                    ))}
                  </span>
                  <span>
                    Tagged with:{' '}
                    {term[1].map(tag => (
                      <LinkWrapper
                        key={tag.slug}
                        href={`/articles?tags=${tag.id}`}
                      >
                        {tag.name}
                      </LinkWrapper>
                    ))}
                  </span>
                </Card.Content>
              </Card>
              <Card fluid className="blog-author-card">
                <Card.Content>
                  <ImageWrapper
                    width="96px"
                    height="96px"
                    src={author[0].avatar_urls['96']}
                  />
                  <div>
                    <h4>About {author[0].name}</h4>
                    <p>{author.description || 'No description available.'}</p>
                  </div>
                </Card.Content>
              </Card>
              {/* comments are currently disabled by stylesheet display:none */}
              <Card fluid className="blog-comments-card">
                <Card.Content>
                  <Card.Header>
                    <h3>
                      <Disqus.CommentCount
                        shortname={disqusShortname}
                        config={{
                          ...disqusConfig,
                          url: `${disqusConfig.url}#disqus_thread`,
                        }}
                      />
                    </h3>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra className="blog-comments-section">
                  <Disqus.DiscussionEmbed
                    shortname={disqusShortname}
                    config={disqusConfig}
                    key={disqusConfig.identifier}
                  />
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column mobile={16} computer={5}>
              <Card fluid className="blog-related-card">
                <Card.Content>
                  <Card.Header>
                    <h2>Related posts:</h2>
                  </Card.Header>
                  {allRelatedPosts ? (
                    allRelatedPosts.slice(0, 3).map(relatedPost => (
                      <LinkWrapper
                        key={v4()}
                        href={`/articles/${relatedPost.slug}`}
                      >
                        <div className="blog-related-single">
                          <ImageWrapper
                            src={
                              relatedPost._embedded['wp:featuredmedia'][0]
                                .source_url
                            }
                          />
                          <p
                            dangerouslySetInnerHTML={dangerouslyRender(
                              relatedPost.title.rendered,
                            )}
                          />
                        </div>
                      </LinkWrapper>
                    ))
                  ) : (
                    <p>No related posts found.</p>
                  )}
                </Card.Content>
              </Card>
              <GetMatchedPaper />
              <Card fluid className="blog-category-sidecard">
                <Card.Content>
                  <Card.Header>
                    <h2>Categories</h2>
                  </Card.Header>
                  {categories &&
                    categories.map(category => (
                      <LinkWrapper
                        key={v4()}
                        href={`/articles?categories=${category.slug}`}
                      >
                        <Icon className="right angle" />
                        <span>{category.name}</span>
                      </LinkWrapper>
                    ))}
                </Card.Content>
              </Card>
              <SubscribePaper />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card fluid className="blog-recent-card">
                <Card.Content>
                  <Card.Header>
                    <h2>Recent Posts:</h2>
                  </Card.Header>
                  <ThreeColumn stackable>
                    {recentPosts.map(recentPost => (
                      <Grid.Column key={v4()} className="blog-recent-single">
                        <LinkWrapper href={`/articles/${recentPost.slug}`}>
                          <ImageWrapper
                            src={
                              recentPost._embedded['wp:featuredmedia'][0]
                                .source_url
                            }
                          />
                          <p
                            dangerouslySetInnerHTML={dangerouslyRender(
                              recentPost.title.rendered,
                            )}
                          />
                        </LinkWrapper>
                      </Grid.Column>
                    ))}
                  </ThreeColumn>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </TemplatePage>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(BlogPost);
