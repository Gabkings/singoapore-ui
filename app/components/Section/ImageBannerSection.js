import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ImageBannerSection(props) {
  return (
    <div
      className="banner_position_services"
      style={{
        backgroundImage: props.imageSource ? `url(${props.imageSource})` : 'none',
        backgroundSize: 'cover',
        width: '100vw',
        height: '330px',
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

ImageBannerSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  imageSource: PropTypes.node,
  style: PropTypes.object,
};

export default ImageBannerSection;
