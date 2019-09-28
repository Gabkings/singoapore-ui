/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';

import './slider-circle.css';

function SliderCircle(props) {
  return (
    <div className="slider-circles">
      {[...Array(props.numDots).keys()].map(index => (
        <i
          key={v4()}
          className={`circle icon slider-circle ${
            props.active === index ? 'active' : ''
          }`}
          {...props.iconProps}
          onClick={() => {
            if (props.onClick !== undefined) props.onClick(index);
          }}
        />
      ))}
    </div>
  );
}

SliderCircle.propTypes = {
  numDots: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  iconProps: PropTypes.object.isRequired,
  // onClick: PropTypes.func,
};

export default SliderCircle;
