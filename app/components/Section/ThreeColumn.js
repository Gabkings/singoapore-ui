import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

function ThreeColumn(props) {
  const { children, ...others } = props;
  return (
    <Grid columns={3} {...others}>
      <Grid.Row>{children}</Grid.Row>
    </Grid>
  );
}

ThreeColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ThreeColumn;
