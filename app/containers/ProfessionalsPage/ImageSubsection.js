import React from 'react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import PaperWrapper from '../../components/Base/Paper';
import Subsection from '../../components/Section/Subsection';
import ImageWrapper from '../../components/Base/Image';
import FiveColumn from '../../components/Section/FiveColumn';
import NavButton from '../../components/CustomButton/NavButton';

/* eslint-disable react/prefer-stateless-function */
export default class ImageSubsection extends React.PureComponent {
  static propTypes = {
    images: PropTypes.object,
  };
  state = {
    imageIndex: 0,
  };
  render() {
    const { images } = this.props;
    const { imageIndex } = this.state;
    return (
      <div>
        {images.results.length > 0 && (
          <Subsection id="images-section">
            <PaperWrapper className="paper">
              <Subsection>
                <div style={{ textAlign: 'left', padding: '20px' }}>
                  <div>
                    <NavButton
                      buttonProps={{
                        style: {
                          float: 'right',
                          margin: '0px 10px',
                          boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.09)',
                        },
                        onClick: () => {
                          this.setState({
                            imageIndex:
                              (this.state.imageIndex -
                                1 +
                                images.results.length) %
                              images.results.length,
                          });
                        },
                      }}
                      iconProps={{ className: 'right' }}
                    />
                    <NavButton
                      buttonProps={{
                        style: {
                          float: 'right',
                          margin: '0px 10px',
                          boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.09)',
                        },
                        onClick: () => {
                          this.setState({
                            imageIndex:
                              (this.state.imageIndex + 1) %
                              images.results.length,
                          });
                        },
                      }}
                      iconProps={{ className: 'left' }}
                    />
                    <h1 style={{ marginBottom: '40px' }}>Images:</h1>
                  </div>
                  <ImageWrapper
                    src={images.results[imageIndex].file_field}
                    alt={images.results[imageIndex].name}
                  />
                </div>
                <Subsection style={{ paddingLeft: '5px' }}>
                  {Array.from(
                    Array(Math.ceil(images.results.length / 5)).keys(),
                  ).map(row => (
                    <FiveColumn stackable key={v4()}>
                      {images.results
                        .slice(row * 5, row * 5 + 5)
                        .map((item, index) => (
                          <Grid.Column key={v4()}>
                            <ImageWrapper
                              className="mobileViewImages"
                              src={item.file_field}
                              alt={item.name}
                              style={{ cursor: 'pointer', paddingLeft: '5px' }}
                              onClick={() => {
                                this.setState({ imageIndex: index });
                              }}
                            />
                          </Grid.Column>
                        ))}
                    </FiveColumn>
                  ))}
                </Subsection>
              </Subsection>
            </PaperWrapper>
          </Subsection>
        )}
      </div>
    );
  }
}
