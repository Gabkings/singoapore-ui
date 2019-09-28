import React from 'react';
import PropTypes from 'prop-types';

function NavButton(props) {
  return (
    <button
      {...props.buttonProps}
      className={`ui circular basic icon button ${props.buttonProps.className}`}
    >
      <i
        {...props.iconProps}
        className={`chevron icon ${props.iconProps.className}`}
      />
    </button>
  );
}

NavButton.propTypes = {
  buttonProps: PropTypes.object.isRequired,
  iconProps: PropTypes.object.isRequired,
};

export default NavButton;
