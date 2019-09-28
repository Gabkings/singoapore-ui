/* eslint-disable array-callback-return */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import { Grid } from 'semantic-ui-react';
import renderHTML from 'react-render-html';
import Section from '../../components/Section/Section';
import Subsection from '../../components/Section/Subsection';
import Card from '../../components/Base/Card/Card';
import CardContent from '../../components/Base/Card/CardContent';
import CardHeader from '../../components/Base/Card/CardHeader';
import Label from '../../components/Base/Label/index';
import { orange } from '../../components/Base/constants';
import './client-review.css';
import SliderCircle from '../../components/SliderCircle';
import { reviews as stubReviews } from './content';
import { HOME_VIEW } from '../../reducers/home';
import { REVIEWS } from '../../actions/restApi';

/* eslint-disable react/prefer-stateless-function */
export default class ClientReviewsSection extends React.PureComponent {
  static propTypes = {
    dispatchAction: PropTypes.func,
  };
  constructor(props) {
    super(props)
    // const reviews = this.props[HOME_VIEW][REVIEWS.MODEL].count > 0 && this.props[HOME_VIEW][REVIEWS.MODEL]
    // const reviewIds = []
    // reviews.results.map(review => {
    //   reviewIds.push({
    //     id: review.id,
    //     showMoreText: true,
    //   })
    // })
    this.state = {
      activePage: 0,
      aboutLength: 'short',
    };
  }
  componentDidMount() {
    this.props.dispatchAction({
      type: REVIEWS.LIST.REQUESTED,
      payload: {
        query: {
          showcase: true,
        },
      },
    });
    const reviews = this.props[HOME_VIEW][REVIEWS.MODEL].count > 0 && this.props[HOME_VIEW][REVIEWS.MODEL] || stubReviews
    const reviewIds = []
    reviews.results.map(review => {
      reviewIds.push({
        id: review.id,
        showMoreText: true,
      })
    })
    this.setState({
      reviewIds,
    })
  }
  componentWillReceiveProps() {
    const reviews = this.props[HOME_VIEW][REVIEWS.MODEL].count > 0 && this.props[HOME_VIEW][REVIEWS.MODEL] || stubReviews
    const reviewIds = []
    reviews.results.map(review => {
      reviewIds.push({
        id: review.id,
        showMoreText: true,
      })
    })
    this.setState({
      reviewIds,
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
      }, () => console.log('reviewIds', reviewIds));
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
      }, () => console.log('reviewIds', reviewIds));
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
    // }, () => console.log('reviewIds', reviewIds))
  };
  render() {
    const reviews =
      (this.props[HOME_VIEW][REVIEWS.MODEL].count > 0 &&
        this.props[HOME_VIEW][REVIEWS.MODEL]) ||
      stubReviews;
    const { activePage } = this.state;
    return (
      <Section id="client-review">
        <Subsection style={{ width: '90%' }}>
          <h2 style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            Our Client Reviews:
          </h2>
          <Grid columns={3} stackable doubling>
            <Grid.Row>
              {reviews.results
                .slice(activePage * 3, (activePage + 1) * 3)
                .map(review => (
                  <Grid.Column key={v4()}>
                    <div style={{ width: '90%', margin: 'auto' }}>
                      <Card className="review-card">
                        <CardHeader>
                          <p>{review.commenter_name}</p>
                        </CardHeader>
                        <CardContent>
                          <Grid columns={2} divided>
                            <Grid.Row>
                              <Grid.Column width={9}>
                                <span className="attr">Company: </span>
                                <span className="attr-value">
                                  {review.listing_name}
                                </span>
                              </Grid.Column>
                              <Grid.Column width={7}>
                                <span className="attr">Type: </span>
                                <Label color={orange}>
                                  {review.category_name}
                                </Label>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </CardContent>
                        <CardContent className="review-text">
                          <React.Fragment>
                            <div id="review-comment">
                              {renderHTML(
                                review.comment,
                              )}
                            </div>
                          </React.Fragment>
                          {/* {this.state.reviewIds !== undefined && this.state.reviewIds.slice(activePage * 3, (activePage + 1) * 3).map((reviewObject) => reviewObject.id === review.id &&
                            <React.Fragment>
                              <div id="review-comment">
                                {review.comment.length <
                                  180 &&
                                  renderHTML(
                                    review.comment,
                                  )}
                                {review.comment.length >=
                                  180 &&
                                  (reviewObject.showMoreText)
                                  ? `${renderHTML(
                                    review.comment.slice(
                                      0,
                                      180,
                                    ),
                                  )}...`
                                  : renderHTML(
                                    review.comment,
                                  )}
                              </div>
                              <button
                                className="review-comment-link"
                                onClick={() => this.toggleAboutLength(reviewObject.id)}
                              >
                                {review.comment.length >=
                                  180 &&
                                  ((reviewObject.showMoreText)
                                    ? 'More'
                                    : 'Less')}
                              </button>
                            </React.Fragment>)} */}
                        </CardContent>
                      </Card>
                    </div>
                  </Grid.Column>
                ))}
            </Grid.Row>
          </Grid>
          <div className="slider-circle-wrapper">
            <SliderCircle
              numDots={2}
              active={activePage}
              iconProps={{}}
              onClick={index => {
                this.setState({ activePage: index });
              }}
            />
          </div>
        </Subsection>
      </Section>
    );
  }
}
