import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import TwoColumn from '../../../components/Section/TwoColumn';
import { articles } from './content';
import PaperWrapper from '../../../components/Base/Paper';
import ImageWrapper from '../../../components/Base/Image';
import Section from '../../../components/Section/Section';
import CustomPagination from '../../../components/CustomPagination';

/* eslint-disable react/prefer-stateless-function */
export default class ArticlesTwoColumnSubsection extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    articles: PropTypes.array,
    articalesActivePage: PropTypes.number,
  };
  render() {
    const { articalesActivePage } = this.props;
    return (
      <Subsection id="articles">
        <h1>Articales:</h1>
        <TwoColumn stackable>
          {articles.map(item => (
            <Grid.Column key={item.key}>
              <PaperWrapper className="paper">
                <Section>
                  <ImageWrapper src={item.imageSource} alt={item.alt} />
                </Section>
                <Subsection className="article-content" style={{}}>
                  <h3>{item.name}</h3>
                </Subsection>
              </PaperWrapper>
            </Grid.Column>
          ))}
        </TwoColumn>
        <div style={{ margin: '20px 0 0' }}>
          <CustomPagination activePage={articalesActivePage} totalPages={5} />
        </div>
      </Subsection>
    );
  }
}
