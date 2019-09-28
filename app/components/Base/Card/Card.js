import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function Card(props) {
  return (
    <div
      {...props}
      className={`ui card full-width-card paper ${props.className}`}
    >
      {props.children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Card;
