import React from 'react';
import PropTypes from 'prop-types';
import { orange } from '../Base/constants';
import './custom-icon.css';
function VerifiedIcon(props) {
  return (
    <div className="verified-icon">
      <i
        className="icons"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...props.style,
        }}
      >
        <i
          className="large icon circle"
          style={{
            color: 'rgba(247, 177, 0, 0.3)',
            marginRight: '0',
          }}
        />
        <i
          className="icon circle"
          style={{
            color: orange,
          }}
        />
        <i
          className="icon tiny check"
          style={{
            color: 'white',
          }}
        />
      </i>
    </div>
  );
}

VerifiedIcon.propTypes = {
  style: PropTypes.object,
};

export default VerifiedIcon;
