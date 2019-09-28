import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

function FiveColumn(props) {
  return (
    <Grid columns={5} stackable={props.stackable}>
      <Grid.Row>{props.children}</Grid.Row>
    </Grid>
  );
}

FiveColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  stackable: PropTypes.bool,
};

export default FiveColumn;
