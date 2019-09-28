import React from 'react';
import PropTypes from 'prop-types';

function CardDescription(props) {
  return (
    <div className="meta" {...props}>
      {props.children}
    </div>
  );
}

CardDescription.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CardDescription;
