import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.css';
function ButtonWrapper(props) {
  const { inputRef, ...others } = props;
  return (
    <button
      {...others}
      className={classNames(
        'custom',
        'ui',
        'button',
        props.design,
        props.className,
      )}
      onClick={props.onClick}
      ref={inputRef}
    >
      {props.children}
    </button>
  );
}

ButtonWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  design: PropTypes.oneOf(['filled', 'outline']),
  onClick: PropTypes.func,
  inputRef: PropTypes.func,
};

export default ButtonWrapper;
