import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

function ImageWrapper(props) {
  const { src, alt, title, rounded, className, ...otherProps } = props;
  return (
    <Image
      {...otherProps}
      src={src}
      className={`${rounded ? 'circular' : ''} ${className || ''}`}
      alt={alt}
      title={title}
    />
  );
}

ImageWrapper.propTypes = {
  src: PropTypes.node.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  rounded: PropTypes.bool,
  className: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
};

export default ImageWrapper;
