import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

function OneColumn(props) {
  return (
    <Grid columns={1} id={props.id} className={props.className}>
      <Grid.Row>
        <Grid.Column>{props.children}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

OneColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  id: PropTypes.string,
  className: PropTypes.string,
};

export default OneColumn;
