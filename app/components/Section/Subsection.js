import React from 'react';
import PropTypes from 'prop-types';
import './section.css';

function Subsection(props) {
  return (
    <div
      {...props}
      className={`subsection ${props.className ? props.className : ''}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

Subsection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  textAlign: PropTypes.string,
  style: PropTypes.object,
};

export default Subsection;
