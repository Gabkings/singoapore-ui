import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function NavigationMenuItem(props) {
  return (
    <a className="item" {...props.a} style={{ padding: '0px 10px' }}>
      <span className="menu-item">
        {props.a.text} {props.icon}
      </span>
    </a>
  );
}

NavigationMenuItem.propTypes = {
  a: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default NavigationMenuItem;
