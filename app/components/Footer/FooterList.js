import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { orange } from '../Base/constants';

import './styles.css';

function FooterList(props) {
  return (
    <div>
      <h3 style={{ color: orange }}>{props.listData.header}</h3>
      <List>
        {props.listData.items.map(item => (
          <List.Item key={item.text}>
            <a href={item.link}>{item.text}</a>
          </List.Item>
        ))}
      </List>
    </div>
  );
}

FooterList.propTypes = {
  listData: PropTypes.object.isRequired,
};

export default FooterList;
