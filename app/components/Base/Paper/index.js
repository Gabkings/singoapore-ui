import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

function PaperWrapper(props) {
  return (
    <Paper elevation={1} {...props}>
      {props.children}
    </Paper>
  );
}

PaperWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PaperWrapper;
