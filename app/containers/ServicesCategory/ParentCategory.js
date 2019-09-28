import React from 'react';
import { Grid } from 'semantic-ui-react';
import renderHTML from 'react-render-html';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import Subsection from '../../components/Section/Subsection';
import PaperWrapper from '../../components/Base/Paper';
import OneColumn from '../../components/Section/OneColumn';
import Section from '../../components/Section/Section';

/* eslint-disable react/prefer-stateless-function */
export default class ParentCategory extends React.Component {
  static propTypes = {
    childrenCategories: PropTypes.array,
    parent: PropTypes.object,
  };

  render() {
    const { parent, childrenCategories: children } = this.props;

    return (
      <Subsection className="services-parent">
        <h1>
          What{' '}
          <span style={{ textDecoration: 'underline' }}>{parent.name}</span>{' '}
          service are you looking for?
        </h1>

        <PaperWrapper>
          <OneColumn>
            {children.map(c => (
              <Grid.Column key={v4()}>
                <div className="subcategory-row">
                  <a href={`/services/${c.slug}`}>
                    <p>{c.name.replace('&amp;', '&')}</p>
                  </a>
                </div>
              </Grid.Column>
            ))}
          </OneColumn>
        </PaperWrapper>
        {parent.description && (
          <Subsection>
            <PaperWrapper id="category-description-paper">
              <Section className="title">
                <h4>{parent.name}</h4>
              </Section>
              <Section className="body">
                <p style={{ textAlign: 'left' }}>
                  {parent.description && renderHTML(parent.description)}
                </p>
              </Section>
            </PaperWrapper>
          </Subsection>
        )}
      </Subsection>
    );
  }
}
