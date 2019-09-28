import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  return (
    <div className="ui action input">
      <select className="ui selection dropdown" {...props.select}>
        {props.options.map(item => <option {...item}>{item.text}</option>)}
      </select>
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.array,
  select: PropTypes.object,
};

export default Select;
