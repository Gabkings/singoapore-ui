import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import PaperWrapper from '../../components/Base/Paper';
import Subsection from '../../components/Section/Subsection';

/* eslint-disable react/prefer-stateless-function */
export default class AboutSubsection extends React.PureComponent {
  static propTypes = {
    professional: PropTypes.object,
  };
  state = {
    aboutLength: 'short',
  };
  toggleAboutLength = () => {
    this.setState({
      aboutLength: this.state.aboutLength === 'long' ? 'short' : 'long',
    });
  };
  render() {
    const { professional } = this.props;
    return (
      <Subsection id="about-us-section">
        <PaperWrapper className="paper">
          <Subsection style={{ padding: '20px' }}>
            <div
              style={{
                textAlign: 'left',
                fontSize: 'initial',
                fontWeight: 200,
                lineHeight: '1.5em',
              }}
            >
              <h1>About Us:</h1>
              {professional.loading
                ? 'Loading'
                : <div className="about-us-des-wrapper">
                  <span className={`${this.state.aboutLength === 'short' ? 'inline-description' : ''}`}>
                    {professional.about_rich_text.length <
                      600 &&
                      renderHTML(
                        professional.about_rich_text
                      )}
                    {professional.about_rich_text.length >=
                      600 &&
                      (this.state.aboutLength === 'short') &&
                      renderHTML(
                        `${professional.about_rich_text.slice(
                          0,
                          600,
                        )}....`,
                      )}
                    {professional.about_rich_text.length >=
                      600 &&
                      (this.state.aboutLength === 'long') &&
                      renderHTML(
                        professional.about_rich_text,
                      )}
                  </span>
                  <span>
                    <button
                      className="view-more-link"
                      id="right"
                      onClick={this.toggleAboutLength}
                    >
                      {professional.about_rich_text.length >=
                        600 &&
                        ((this.state.aboutLength === 'short')
                          ? 'More'
                          : 'Less')}
                    </button>
                  </span>
                </div>
              }
            </div>
          </Subsection>
        </PaperWrapper>
      </Subsection>
    );
  }
}
