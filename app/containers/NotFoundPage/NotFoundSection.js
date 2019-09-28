import React from 'react';
import Section from '../../components/Section/Section';
import LinkWrapper from '../../components/Base/Link';
import ButtonWrapper from '../../components/Base/Button';
import './styles.css';
// eslint-disable-next-line react/prefer-stateless-function
export default class NotFoundSection extends React.PureComponent {
  render() {
    return (
      <Section id="not-found-page">
        <Section className="header">
          <h1>404</h1>
          <h2>This page is not found</h2>
          <h3>Please try one of the following pages:</h3>
          <LinkWrapper href="/">
            <ButtonWrapper design="filled">Home Page</ButtonWrapper>
          </LinkWrapper>
        </Section>
      </Section>
    );
  }
}
