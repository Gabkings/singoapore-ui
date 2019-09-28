import React from 'react';
import PropTypes from 'prop-types';
import './section.css';

function Section(props) {
  return (
    <div
      {...props}
      className={`section ${props.className ? props.className : ''}`}
    >
      {props.children}
    </div>
  );
}

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Section;
