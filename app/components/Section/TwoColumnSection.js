import React from 'react';
import PropTypes from 'prop-types';

function getColumnClass(colIndex, { wide }) {
  let className;
  switch (wide) {
    case 'left':
      className = {
        0: 'ten wide column',
        1: 'six wide column',
      };
      break;
    case 'right':
      className = {
        0: 'six wide column',
        1: 'ten wide column',
      };
      break;
    default:
    case 'equal':
      className = {
        0: 'eight wide column',
        1: 'eight wide column',
      };
  }
  return className[colIndex];
}

function TwoColumnSection(props) {
  return (
    <div className="ui grid">
      <div className={getColumnClass(0, { wide: props.wide })}>
        {props.columnOne}
      </div>
      <div className={getColumnClass(1, { wide: props.wide })}>
        {props.columnTwo}
      </div>
    </div>
  );
}

TwoColumnSection.propTypes = {
  wide: PropTypes.oneOf(['left', 'right', 'equal']),
  columnOne: PropTypes.object,
  columnTwo: PropTypes.object,
};

export default TwoColumnSection;
