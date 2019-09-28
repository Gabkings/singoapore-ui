import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

function SecondaryNavBar(props) {
  return (
    <Menu fixed="top" style={{ top: '63px' }}>
      {props.items.map(item => <Menu.Item key={item.key} {...item} />)}
    </Menu>
  );
}

SecondaryNavBar.propTypes = {
  items: PropTypes.array,
};

export default SecondaryNavBar;
