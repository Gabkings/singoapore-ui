/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
import React from 'react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import StarRatings from 'react-star-ratings';
import { Grid, Modal, Form } from 'semantic-ui-react';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';
import RatingStar from '../../components/Base/RatingStar';
import ImageWrapper from '../../components/Base/Image';
import PaperWrapper from '../../components/Base/Paper';
import './styles.css';
import Section from '../../components/Section/Section';
import VerifiedIcon from '../../components/CustomIcon/VerifiedIcon';
import CustomPagination from '../../components/CustomPagination';
import Avatar from '../../images/avatar-placeholder.png'
import ButtonWrapper from '../../components/Base/Button';
import { REVIEWS } from '../../actions/restApi';
import ReportModal from './ReportModal';

const PER_PAGE = 3

/* eslint-disable react/prefer-stateless-function */
export default class ReviewsSubsection extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
    reviews: PropTypes.object,
    user: PropTypes.object,
    dispatchAction: PropTypes.func,
  };
  constructor(props) {
    super(props)
    // console.log('reviewIds',reviewIdsArray)
    this.state = {
      reviewsActivePage: 1,
      newRating: 0,
      openReviewModal: false,
      openReviewSuccessModal: false,
      newComment: '',
      aboutLength: 'short',
    }
  }
  toggleAboutLength = () => {
    this.setState({
      aboutLength: this.state.aboutLength === 'long' ? 'short' : 'long',
    });
  };
  componentDidMount() {
    this.setReviewsIdArray()
  }
  componentWillReceiveProps() {
    this.setReviewsIdArray()
  }
  onPageChange = (e, d) => {
    this.setState({ reviewsActivePage: d.activePage }, () => {
      this.setReviewsIdArray()
    })
  }
  setReviewsIdArray = () => {
    const { reviewsActivePage } = this.state
    const { reviews } = this.props;
    let shownResults = [];
    if (reviews && reviews.results) {
      shownResults = reviews.results.slice((reviewsActivePage - 1) * PER_PAGE, reviewsActivePage * PER_PAGE);
    }
    const reviewIdsArray = []
    shownResults.map(item => {
      reviewIdsArray.push({
        id: item.id,
        showMoreText: true,
      })
    })
    this.setState({
      reviewIds: reviewIdsArray,
    })
  }
  toggleAboutLength = (id) => {
    const { reviewIds } = this.state
    if (this.state.aboutLength === 'long') {
      for (let i = 0; i < reviewIds.length; i++) {
        if (reviewIds[i].id === id) {
          reviewIds[i].showMoreText = true;
          break;
        }
      }
      this.setState({
        aboutLength: 'short',
        reviewIds,
      });
    } else {
      for (let i = 0; i < reviewIds.length; i++) {
        if (reviewIds[i].id === id) {
          reviewIds[i].showMoreText = false;
          break;
        }
      }
      this.setState({
        aboutLength: 'long',
        reviewIds,
      });
    }
    // const { reviewIds } = this.state
    // for (let i = 0; i < reviewIds.length; i++) {
    //   if (reviewIds[i].id === id) {
    //     reviewIds[i].showMoreText = !reviewIds[i].showMoreText;
    //     break;
    //   }
    // }
    // this.setState({
    //   reviewIds,
    // })
  };
  render() {
    const { reviews, user, professional } = this.props;
    const { reviewsActivePage, newRating, openReviewModal, newComment, openReviewSuccessModal } = this.state;
    let shownResults = [];
    if (reviews && reviews.results) {
      shownResults = reviews.results.slice((reviewsActivePage - 1) * PER_PAGE, reviewsActivePage * PER_PAGE);
    }
    return (
      <Subsection id="reviews">
        <PaperWrapper className="paper">
          <Section>
            <div className="inline" style={{ color: 'gray' }}>
              <h2>({reviews.count})</h2>
            </div>
            <div className="inline">
              <h1>Reviews:</h1>
            </div>
            <div className="inline review-starts-wrapper">
              {reviews.count === 0 && (
                <RatingStar
                  // disabled
                  maxRating={5}
                  defaultRating={0}
                  size="huge"
                />
              )}
              {reviews.count > 0 && (
                <RatingStar
                  disabled
                  maxRating={5}
                  defaultRating={reviews.results
                    .map(review => review.rating)
                    .reduce((a, b) => a + b, 0) / reviews.count}
                  size="huge"
                />
              )}
            </div>
            {user.LOAD_AUTH.data.consumerId && user.LOAD_AUTH.data.consumerId !== -1 && (
              <div className="inline">
                <Modal
                  trigger={
                    <ButtonWrapper id="new-review-button" design="filled" onClick={() => { this.setState({ openReviewModal: true }) }}>New Review</ButtonWrapper>
                  }
                  open={openReviewModal}
                  onClose={() => { this.setState({ openReviewModal: false }) }}
                  size="mini"
                >
                  <Subsection>
                    <h1>Create Review</h1>
                    <Form
                      onSubmit={e => {
                        e.preventDefault();
                        const data = new FormData(e.target)
                        this.props.dispatchAction({
                          type: REVIEWS.POST.REQUESTED,
                          payload: {
                            data,
                          },
                        });
                        this.setState({ openReviewModal: false, openReviewSuccessModal: true, newRating: 0, newComment: '' })
                      }}>
                      <RatingStar
                        maxRating={5}
                        defaultRating={0}
                        size="huge"
                        onRate={(e, d) => { this.setState({ newRating: d.rating }) }}
                      />
                      <input type="hidden" name="rating" value={newRating} />
                      <input type="hidden" name="commenter_name" value={user.user.long_first_name} />
                      <input type="hidden" name="user" value={user.user.id} />
                      <input type="hidden" name="commenter_email" value={user.user.email} />
                      <input type="hidden" name="listing_name" value={professional.name} />
                      <input type="hidden" name="listing" value={professional.id} />
                      <h4>Comment</h4>
                      <textarea
                        name="comment"
                        value={newComment}
                        onChange={(e) => {
                          this.setState({ newComment: e.target.value })
                        }}
                      />
                      <ButtonWrapper design="filled" type="submit">Submit</ButtonWrapper>
                    </Form>
                  </Subsection>
                </Modal>
                <Modal
                  open={openReviewSuccessModal}
                  onClose={() => { this.setState({ openReviewSuccessModal: false }) }}
                  size="mini"
                >
                  <Subsection>
                    <h1>Your review is received and pending approval</h1>
                    <ButtonWrapper design="filled" onClick={() => { this.setState({ openReviewSuccessModal: false }) }}>OK</ButtonWrapper>
                  </Subsection>
                </Modal>
              </div>
            )}
          </Section>
          {shownResults.map(item => (
            <Subsection key={v4()} className="single-review">
              <TwoColumn stackable={false}>
                <Grid.Column width={3}>
                  <ImageWrapper
                    src={Avatar}
                    rounded
                    style={{ width: '50px', margin: 'auto' }}
                  />
                </Grid.Column>
                <Grid.Column width={13}>
                  <div>
                    <TwoColumn stackable={false}>
                      <Grid.Column width={13}>
                        <div style={{ textAlign: 'left' }}>
                          <div className="inline">
                            <h3>{item.commenter_name}</h3>
                          </div>
                          {item.commenter_name !== 'Customer Review' &&
                            <React.Fragment>
                              <div className="inline">|</div>
                              <div className="inline">
                                <h4 style={{ color: 'gray' }}>
                                  {new Date(item.date).toDateString()}
                                </h4>
                              </div>
                            </React.Fragment>
                          }
                          {item.rating !== 0 && (
                            <span className="star-rating-wrapper">
                              <StarRatings
                                rating={item.rating}
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="1px"
                                starRatedColor="rgb(255, 177, 0)"
                                starEmptyColor="rgb(0,0,0,0.15)"
                              />
                            </span>
                          )}
                          {item.rating === 0 && (
                            <StarRatings
                              rating={0}
                              numberOfStars={5}
                              starDimension="20px"
                              starSpacing="1px"
                              starRatedColor="rgb(255, 177, 0)"
                              starEmptyColor="rgb(0,0,0,0.15)"
                            />
                          )}
                        </div>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <div
                          style={{
                            textAlign: 'right',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <VerifiedIcon style={{ marginRight: '10px' }} />
                          <ReportModal
                            {...this.props}
                            review={item}
                            triggerButtonChild={
                              <i
                                className="flag icon"
                                style={{
                                  position: 'relative',
                                  top: '-2px',
                                  color: 'rgba(0, 0, 0, 0.6)',
                                }}
                              />
                            }
                          />
                        </div>
                      </Grid.Column>
                    </TwoColumn>
                  </div>
                  <div className="review-text">
                    {this.state.reviewIds !== undefined && this.state.reviewIds.map(object => {
                      if (object.id === item.id) {
                        return <span>
                          <span id="review-comment">
                            {item.comment.length <
                              230 ?
                              renderHTML(
                                item.comment,
                              ) :
                              item.comment.length >=
                                230 &&
                                (object.showMoreText)
                                ? `${renderHTML(
                                  item.comment.slice(
                                    0,
                                    230,
                                  ),
                                )}...`
                                : renderHTML(
                                  item.comment,
                                )
                            }
                          </span>
                          <span id="review-comment-button">
                            <button
                              className="view-more-link"
                              onClick={() => this.toggleAboutLength(object.id)}
                            >
                              {item.comment.length >=
                                230 &&
                                ((object.showMoreText)
                                  ? 'More'
                                  : 'Less')}
                            </button>
                          </span>
                        </span>
                      }
                    })}
                    {/* <React.Fragment>
                        <div id="review-comment">
                          {item.comment.length <
                            500
                            console.log('object') &&
                            renderHTML(
                              item.comment,
                            )}
                          {item.comment.length >=
                            500
                            console.log('object') &&
                            (this.state.aboutLength === 'short') &&
                            `${renderHTML(
                              item.comment.slice(
                                0,
                                500
                                console.log('object'),
                              ),
                            )}...`}
                          {item.comment.length >=
                            500
                            console.log('object') &&
                            (this.state.aboutLength === 'long') &&
                            renderHTML(
                              item.comment,
                            )}
                        </div>
                        <button
                          className="view-more-link"
                          onClick={this.toggleAboutLength}
                        >
                          {item.comment.length >=
                            500
                            console.log('object') &&
                            ((this.state.aboutLength === 'short')
                              ? 'More'
                              : 'Less')}
                        </button>
                      </React.Fragment> */}
                  </div>
                </Grid.Column>
              </TwoColumn>
            </Subsection>
          ))}
          {reviews.count > 0 && (
            <Subsection style={{ padding: '30px' }}>
              <CustomPagination
                activePage={reviewsActivePage}
                totalPages={Math.ceil(reviews.count / PER_PAGE)}
                onPageChange={(e, d) => this.onPageChange(e, d)}
              />
            </Subsection>
          )}
        </PaperWrapper>
      </Subsection>
    );
  }
}
