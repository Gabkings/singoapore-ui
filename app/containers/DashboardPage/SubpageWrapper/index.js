import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import TwoColumn from '../../../components/Section/TwoColumn';
import './styles.css';
import SubPageDescription from './SubPageDescription';
import SubPageContent from './SubPageContent';

/* eslint-disable react/prefer-stateless-function */
export default class SubPageWrapper extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    currentTab: PropTypes.string.isRequired,
    tabTitle: PropTypes.string.isRequired,
    tabLink: PropTypes.string.isRequired,
  };

  getComponent(node) {
    return this.props.children.filter(comp => comp.type === node.type);
  }

  render() {
    const { tabLink, tabTitle, currentTab, children } = this.props;
    if (!children.length) {
      return null;
    }

    return (
      <div style={{ display: currentTab === tabLink ? 'inherit' : 'none' }}>
        <TwoColumn className="subpage-wrapper">
          <Grid.Column width={6}>
            <h3>{tabTitle}</h3>
            {this.getComponent(<SubPageDescription />)}
          </Grid.Column>
          <Grid.Column width={10}>
            {this.getComponent(<SubPageContent />)}
          </Grid.Column>
        </TwoColumn>
      </div>
    );
  }
}
