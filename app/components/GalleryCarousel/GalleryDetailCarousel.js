import React from 'react';
import PropTypes from 'prop-types';
import SliderCircle from '../SliderCircle/index';
import CarouselImageItem from './CarouselImageItem';
import './styles.css';

export default class GalleryDetailCarousel extends React.PureComponent {
  static propTypes = {
    images: PropTypes.array.isRequired,
    imageProps: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }

  changeDisplayImage = change => {
    const { images } = this.props;
    const { imageIndex } = this.state;
    this.setState({
      imageIndex:
        images.length > 0
          ? (imageIndex + change + images.length) % images.length
          : 0,
    });
  };
  render() {
    const {
      images,
      imageProps = {},
      width = '100%',
      height = 260,
      className,
    } = this.props;
    const { imageIndex } = this.state;
    
    // console.log('height',height)
    return (
      <div className={`gallery-carousel ${className}`}>
        <div
          className="carousel-viewport"
          style={{ width: `${width}`, height: `${height}` }}
        >
          <div
            className="carousel-imagestrip"
            style={{
              position: 'relative',
              height: `${height}px`,
              left: `-${100 * imageIndex}%`,
            }}
          >
            {images.map(item => (
              <CarouselImageItem image={item} height={height} width={width} imageProps={imageProps}/>
            ))}
          </div>
          <button
            className="left-arrow-gallery-page"
            onClick={() => this.changeDisplayImage(-1)}
            style={{ top: `${(height - 100) / 2}px` }}
          >
            <i className="angle left icon" />
          </button>
          <button
            className="right-arrow-gallery-page"
            onClick={() => this.changeDisplayImage(1)}
            style={{ top: `${(height - 100) / 2}px` }}
          >
            <i className="angle right icon" />
          </button>
          {/* <div className="detail-overlay" style={{}}>
            <p style={{ fontSize: '0.7em' }}>For:</p>
            <p style={{ fontSize: '1.2em' }}>
              {images[imageIndex] && images[imageIndex].address}
            </p>
            <p>
              Company:{' '}
              <strong>
                {images[imageIndex] && images[imageIndex].company}
              </strong>
            </p>
          </div> */}
          <div className="slider-circles-wrapper">
            <SliderCircle
              numDots={images.length}
              active={imageIndex}
              iconProps={{ style: { fontSize: 10 } }}
            />
          </div>
        </div>
      </div>
    );
  }
}
