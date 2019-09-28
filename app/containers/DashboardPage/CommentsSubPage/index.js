import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import v4 from 'uuid/v4';
import { generateText } from '../../../utils/loremIpsumGenerator';

// import { LISTINGS } from '../../../actions/restApi';
import { comments } from './content';
// import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';
import Divider from '../../../components/Base/Divider';
import Card from '../../../components/Base/Card/Card';
import './styles.css';
import CardContent from '../../../components/Base/Card/CardContent';

/* eslint-disable react/prefer-stateless-function */
export default class CommentsSubPage extends React.PureComponent {
  static propTypes = {
    currentTab: PropTypes.string,
    // dispatchAction: PropTypes.func.isRequired,
    // [DASHBOARD_VIEW]: PropTypes.object,
    // user: PropTypes.object.isRequired,
  };
  render() {
    const { currentTab } = this.props;
    return (
      <SubPageWrapper
        currentTab={currentTab}
        tabTitle="Comments"
        tabLink="comments"
      >
        <SubPageDescription>{generateText(200)}</SubPageDescription>
        <SubPageContent>
          {comments.map(item => (
            <Card className="comments-card" key={v4()}>
              <CardContent>
                <div className="comments-card-header">
                  <h3>{item.postName}</h3>
                  <span className="comments-card-date">{`On ${
                    item.date
                  }`}</span>
                </div>
                <div className="comments-card-content">
                  <p>{item.text}</p>
                </div>
                <Divider />
                <div className="comments-card-footer">
                  <div className="comments-card-edit">
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
}
