import React from 'react';
import PropTypes from 'prop-types';

function CardContent(props) {
  return (
    <div
      {...props.props}
      className={`content ${props.className ? props.className : ''}`}
    >
      {props.children}
    </div>
  );
}

CardContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  props: PropTypes.object,
  className: PropTypes.string,
};

export default CardContent;
