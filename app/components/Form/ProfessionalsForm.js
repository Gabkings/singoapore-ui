import React from 'react';
import PropTypes from 'prop-types';
import { Form as Formio } from 'react-formio';

import PaperWrapper from '../Base/Paper/index';
import Subsection from '../Section/Subsection';
import './formio-bootstrap.css';
import './formio.css';
import './form.css';

class ProfessionalsForm extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string,
    onSubmit: PropTypes.func,
    submission: PropTypes.object,
  };
  render() {
    const { url, onSubmit, submission } = this.props;
    return (
      <Subsection style={{ paddingBottom: '10px', maxWidth: '1024px' }}>
        <PaperWrapper>
          <Subsection style={{ paddingBottom: '10px' }}>
            <Formio src={url} onSubmitDone={onSubmit} submission={submission} />
          </Subsection>
        </PaperWrapper>
      </Subsection>
    );
  }
  componentDidMount() {
    // const formio = new Formio('https://sghomeneeds-formio.herokuapp.com/test');
    // console.log(formio);
  }
}

export default ProfessionalsForm;
