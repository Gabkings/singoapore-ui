import React from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'semantic-ui-react';

import './rating-star.css';

function RatingStar(props) {
  return (
    <Rating icon="star" {...props} maxRating={props.maxRating} size="huge" />
  );
}

RatingStar.propTypes = {
  defaultRating: PropTypes.number,
  maxRating: PropTypes.number,
  // disabled: PropTypes.bool,
};

export default RatingStar;
