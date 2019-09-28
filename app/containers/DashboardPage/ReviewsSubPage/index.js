import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import renderHTML from 'react-render-html';
import { generateText } from '../../../utils/loremIpsumGenerator';
import Card from '../../../components/Base/Card/Card';
import CardContent from '../../../components/Base/Card/CardContent';
import RatingStar from '../../../components/Base/RatingStar';
import Divider from '../../../components/Base/Divider';
import './styles.css';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';
import { REVIEWS } from '../../../actions/restApi';
import { DASHBOARD_VIEW } from '../../../reducers/dashboard';

/* eslint-disable react/prefer-stateless-function */
export default class ReviewSubPage extends React.PureComponent {
  static propTypes = {
    dispatchAction: PropTypes.func,
    currentTab: PropTypes.string,
    user: PropTypes.object,
  };
  render() {
    const { currentTab } = this.props;
    const reviews = this.props[DASHBOARD_VIEW][REVIEWS.MODEL].LIST.results;
    return (
      <SubPageWrapper
        currentTab={currentTab}
        tabTitle="Reviews"
        tabLink="reviews"
      >
        <SubPageDescription>{generateText(200)}</SubPageDescription>
        <SubPageContent>
          {reviews.map(review => (
            <Card className="review-card" key={review.id}>
              <CardContent>
                <div className="review-card-header">
                  <div>
                    <h3>{renderHTML(review.listing_name)}</h3>
                    <RatingStar
                      defaultRating={review.rating}
                      maxRating={5}
                      disabled
                    />
                    <span className="review-card-date">
                      {' '}
                      on {new Date(review.date).toDateString()}
                    </span>
                  </div>
                  <div className="review-card-content">
                    <p>{review.comment}</p>
                  </div>
                </div>
                <Divider />
                <div className="review-card-footer">
                  <div
                    className={
                      review.is_approved
                        ? `review-card-status-approved`
                        : `review-card-status-pending`
                    }
                  >
                    {review.is_approved ? 'Approved' : 'Pending'}
                  </div>
                  <div className="review-card-edit">
                    <button className="ui button">
                      <Icon className="ui edit" /> Request to Edit
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </SubPageContent>
      </SubPageWrapper>
    );
  }
  componentDidMount() {
    if (this.props.user.LOAD_AUTH.data.merchantId) {
      this.props.dispatchAction({
        type: REVIEWS.LIST.REQUESTED,
        payload: {
          query: {
            merchant: this.props.user.LOAD_AUTH.data.merchantId,
          },
        },
      });
    }
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {}
}
