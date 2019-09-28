import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

function TwoColumn(props) {
  return (
    <Grid
      stackable={props.stackable === undefined ? true : props.stackable}
      columns={2}
      {...props}
    >
      <Grid.Row>{props.children}</Grid.Row>
    </Grid>
  );
}

TwoColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  stackable: PropTypes.bool,
  divided: PropTypes.bool,
  reversed: PropTypes.string,
};

export default TwoColumn;
