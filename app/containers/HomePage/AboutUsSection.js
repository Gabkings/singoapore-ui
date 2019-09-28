import React from 'react';
// import PaperWrapper from '../../components/Base/Paper';
import Subsection from '../../components/Section/Subsection';
import { aboutUs } from './content'

/* eslint-disable react/prefer-stateless-function */
export default class AboutUsSection extends React.PureComponent {
  render() {
    return (
      <Subsection id="about-us-section">
        {/* <PaperWrapper className="paper"> */}
        <Subsection style={{ width: '77%', padding: '20px' }}>
          <div
            style={{
              textAlign: 'left',
              fontSize: 'initial',
              fontWeight: 200,
              lineHeight: '1.5em',
              marginBottom: '1em',
            }}
          >
            <h1>About Us:</h1>
          </div>
          <div
            style={{
              textAlign: 'left',
              fontSize: 'initial',
              fontWeight: 200,
              lineHeight: '1.5em',
            }}
          >
            {aboutUs.results.map(paragraph => (
              <p>{paragraph.comment}</p>
            ))}
          </div>
        </Subsection>
        {/* </PaperWrapper> */}
      </Subsection>
    );
  }
}
