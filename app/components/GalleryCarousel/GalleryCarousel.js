import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SliderCircle from '../SliderCircle/index';
import './styles.css';

export default class GalleryCarousel extends React.PureComponent {
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
      width = 292,
      height = 260,
      className = '',
    } = this.props;
    const { imageIndex } = this.state;
    return (
      <div className={`gallery-carousel ${className}`}>
        <div
          className="carousel-viewport"
          style={{ width: `${width}px`, height: `${height}` }}
        >
          <div
            className="carousel-imagestrip"
            style={{
              position: 'relative',
              height: `${height}px`,
              left: `-${width * imageIndex}px`,
            }}
          >
            {images.map(item => (
              <Image
                {...imageProps}
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  ...imageProps.style,
                }}
                key={item.alt}
                className="carousel-single-image"
                src={item.src}
                alt={item.alt}
              />
            ))}
          </div>
          <button
            className="left-arrow"
            onClick={() => this.changeDisplayImage(-1)}
          >
            <i className="angle left icon" />
          </button>
          <button
            className="right-arrow"
            onClick={() => this.changeDisplayImage(1)}
          >
            <i className="angle right icon" />
          </button>
          <SliderCircle
            numDots={images.length}
            active={imageIndex}
            iconProps={{ style: { fontSize: 10 } }}
          />
        </div>
      </div>
    );
  }
}
