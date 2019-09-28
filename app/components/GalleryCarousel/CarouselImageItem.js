import React from 'react';
import { Image } from 'semantic-ui-react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import './styles.css';

export default class CarouselImageItem extends React.PureComponent {
  static propTypes = {
    image: PropTypes.object,
    imageProps: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      imgClassName: 'gallery-page-image',
    };
  }
  onImgLoad = ({ target: img }) => {
    const imgClassName = img.naturalWidth > 4000 ? "gallery-page-image carousel-single-image-portrait" : "gallery-page-image"
    this.setState({imgClassName});
  };
  render() {
    const { image, height, width, imageProps } = this.props
    const { imgClassName } = this.state;

    return (
      <Image
        {...imageProps}
        style={{
          width: `${width}`,
          height: `${height}px`,
          maxHeight: '650px',
          ...imageProps.style,
        }}
        onLoad={this.onImgLoad}
        key={v4()}
        className={imgClassName}
        src={image.src}
        alt={image.alt}
      />
    )
  }
}
