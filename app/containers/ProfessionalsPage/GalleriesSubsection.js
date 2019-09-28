import React from 'react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';
import PaperWrapper from '../../components/Base/Paper';
import GalleryCarouselFullWidth from '../../components/GalleryCarousel/GalleryCarouselFullWidth';

/* eslint-disable react/prefer-stateless-function */
export default class GalleriesSubsection extends React.PureComponent {
  static propTypes = {
    galleries: PropTypes.object,
    goTo: PropTypes.func,
  };
  state = {};
  render() {
    const { galleries } = this.props;
    return (
      <Subsection id="gallery">
        <h1 style={{ textAlign: 'left' }}>Gallery:</h1>
        <TwoColumn stackable style={{ padding: '0px 3px' }}>
          {galleries.results.map(gallery => (
            <Grid.Column
              key={v4()}
              computer={8}
              tablet={16}
              mobile={16}
              style={{ padding: '0px 10px' }}
            >
              <PaperWrapper
                className="paper"
                style={{ width: `${100}%`, marginBottom: '0px' }}
              >
                <div className="gallery-single">
                  <GalleryCarouselFullWidth
                    gallery={gallery}
                    images={gallery.files.map(f => ({
                      src: f.thumbnail || f.file_field,
                      alt: f.name,
                    }))}
                  />
                  <button
                    className="gallery-single-text"
                    style={{
                      width: '100%',
                      margin: '8px auto',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      this.props.goTo({ path: `/gallery/${gallery.slug}` });
                    }}
                  >
                    <h4 style={{ padding: '7px 0px' }}>
                      {gallery.wp_post_title}
                    </h4>
                  </button>
                </div>
              </PaperWrapper>
            </Grid.Column>
          ))}
        </TwoColumn>
      </Subsection>
    );
  }
}
