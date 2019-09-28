import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal as SemanticModal } from 'semantic-ui-react';

function Modal(props) {
  return (
    <SemanticModal trigger={<Button>Show Modal</Button>}>
      {props.children}
    </SemanticModal>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Modal;
