import React from 'react';
import PaperWrapper from '../../components/Base/Paper';
import Subsection from '../../components/Section/Subsection';
import SearchBar from '../../components/SearchBar';

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
            <div style={{ textAlign: 'left', padding: '10px' }}>
              <h2 style={{ color: '#fff' }}>
                CONNECT TO A PROFESSIONAL IN 60S!
              </h2>
              <SearchBar placeholder="Keywords" {...this.props} fluid />
            </div>
          </Subsection>
        </PaperWrapper>
      </Subsection>
    );
  }
}
