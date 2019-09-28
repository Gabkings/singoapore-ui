import React from 'react';
import PaperWrapper from '../../components/Base/Paper';
import Subsection from '../../components/Section/Subsection';
import ButtonWrapper from '../../components/Base/Button';

export default class ConnectProfessionalsSubsection extends React.PureComponent {
  render() {
    return (
      <Subsection>
        <PaperWrapper
          style={{
            backgroundImage:
              'linear-gradient(to bottom right, rgb(255, 177, 0), rgb(255, 120, 0)',
          }}
        >
          <Subsection>
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <h4 style={{ color: '#fff' }}>
                Get matched to a suitable pro
              </h4>
              <ButtonWrapper
                {...this.props}
                className="start-button"
                design="filled"
              >
                Start Now
              </ButtonWrapper>
            </div>
          </Subsection>
        </PaperWrapper>
      </Subsection>
    );
  }
}
