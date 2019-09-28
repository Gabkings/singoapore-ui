import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.css';

function LinkWrapper(props) {
  return (
    <Link className="link-wrapper" href to={props.href} {...props}>
      {props.children}
    </Link>
  );
}

LinkWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  href: PropTypes.string,
};

export default LinkWrapper;
