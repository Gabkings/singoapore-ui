import React from 'react';
import PropTypes from 'prop-types';

function CardMeta(props) {
  return <div className="meta">{props.children}</div>;
}

CardMeta.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CardMeta;
