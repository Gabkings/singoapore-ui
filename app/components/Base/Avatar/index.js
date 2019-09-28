import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
function Avatar(props) {
  const { src, size, borderWidth, style, ...otherProps } = props;
  return (
    <Image
      {...otherProps}
      src={src}
      circular
      width={`${size || 50}px`}
      height={`${size || 50}px`}
      style={{
        borderRadius: '50%',
        border: `${borderWidth || 3}px solid white`,
        boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.2)',
        objectFit: 'cover',
        ...style,
      }}
    />
  );
}

Avatar.propTypes = {
  style: PropTypes.object,
  src: PropTypes.string.isRequired,
  size: PropTypes.number, // default is 50px width and height
  borderWidth: PropTypes.number,
};

export default Avatar;
