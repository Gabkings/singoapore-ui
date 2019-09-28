import React from 'react';
import PropTypes from 'prop-types';
import { Accordion as SemanticAccordion } from 'semantic-ui-react';

function Accordion(props) {
  return <SemanticAccordion {...props} />;
}

Accordion.propTypes = {
  panels: PropTypes.array.isRequired,
  defaultActiveIndex: PropTypes.array.isRequired,
  exclusive: PropTypes.bool.isRequired,
  fluid: PropTypes.bool.isRequired,
};

export default Accordion;
