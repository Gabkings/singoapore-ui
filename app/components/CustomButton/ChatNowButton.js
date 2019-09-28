import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './custom-button.css';
function ChatNowButton(props) {
  const { buttonProps = {}, iconProps = {}, onClick } = props;
  return (
    <button
      {...buttonProps}
      className={`ui button filled chat-now ${buttonProps.className}`}
      style={{
        ...buttonProps.style,
      }}
      onClick={onClick}
    >
      <Icon
        {...iconProps}
        className={`comments outline ${iconProps.className}`}
      />
      <span>Chat Now</span>
    </button>
  );
}

ChatNowButton.propTypes = {
  buttonProps: PropTypes.object,
  iconProps: PropTypes.object,
  onClick: PropTypes.func,
};

export default ChatNowButton;
