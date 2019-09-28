import React from 'react';
import PropTypes from 'prop-types';
import PaperWrapper from '../Base/Paper/index';
import Subscribe from '../Footer/Subscribe';
import Subsection from '../Section/Subsection';
import './subscribe-paper.css';

function SubscribePaper(props) {
  return (
    <PaperWrapper id="subscribe-paper">
      <Subsection>
        <Subscribe
          headerText={
            <h2>
              Subscribe<span style={{ color: '#ffb100' }}>:</span>
            </h2>
          }
          buttonText="Subscribe"
          buttonType="filled"
          onSubmit={props.onSubscribe}
          onNameChange={props.onNameChange}
          onEmailChange={props.onEmailChange}
        />
      </Subsection>
    </PaperWrapper>
  );
}

SubscribePaper.propTypes = {
  onSubscribe: PropTypes.func,
  onNameChange: PropTypes.func,
  onEmailChange: PropTypes.func,
};

export default SubscribePaper;
