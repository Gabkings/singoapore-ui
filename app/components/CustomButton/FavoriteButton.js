import React from 'react';
import PropTypes from 'prop-types';
import './custom-button.css';
class FavoriteButton extends React.PureComponent {
  static propTypes = {
    buttonProps: PropTypes.object.isRequired,
    iconProps: PropTypes.object.isRequired,
    isFavourite: PropTypes.bool,
  };

  render() {
    const { buttonProps, iconProps } = this.props;
    return (
      <button
        {...buttonProps}
        className={`favourite-button ui circular basic icon button ${
          buttonProps.className
        } ${this.props.isFavourite ? 'favourite' : ''}`}
      >
        <i
          {...iconProps}
          className={`heart outline icon ${
            iconProps.className ? iconProps.className : ''
          } ${this.props.isFavourite ? 'favourite' : ''}`}
          style={{
            // color: 'red',
            // position: 'relative',
            // left: '-1px',
            // top: '1px',
            ...iconProps.style,
          }}
        />
      </button>
    );
  }
}

export default FavoriteButton;
