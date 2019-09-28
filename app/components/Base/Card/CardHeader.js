import React from 'react';
import PropTypes from 'prop-types';

function CardHeader(props) {
  return (
    <div className="header" {...props}>
      {props.children}
    </div>
  );
}

CardHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CardHeader;
