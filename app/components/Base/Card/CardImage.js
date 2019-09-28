import React from 'react';
import PropTypes from 'prop-types';

function CardImage(props) {
  return (
    <div className="image">
      <img src={props.source} alt={props.alt} />
    </div>
  );
}

CardImage.propTypes = {
  source: PropTypes.node,
  alt: PropTypes.string,
};

export default CardImage;
