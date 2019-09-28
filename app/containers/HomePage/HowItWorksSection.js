import React from 'react';
// import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Subsection from '../../components/Section/Subsection';
import ImageWrapper from '../../components/Base/Image/index';
import Section from '../../components/Section/Section';
import TwoColumn from '../../components/Section/TwoColumn';

// // import Step1 from '../../images/HomePage/step1.png';
// import Step1 from '../../images/new-images/section_three_img1.png';
// // import Step2 from '../../images/HomePage/step2.jpg';
// import Step2 from '../../images/new-images/section_three_img2.png';
// // import Step3 from '../../images/HomePage/step3.jpg';
// import Step3 from '../../images/new-images/section_three_img3.png';

import './how-it-works.css';
import { getS3Image } from '../../utils/images';

const Step1 = getS3Image('/images/new-images/section_three_img1.png');
const Step2 = getS3Image('/images/new-images/section_three_img2.png');
const Step3 = getS3Image('/images/new-images/section_three_img3.png');

/* eslint-disable react/prefer-stateless-function */
export default class HowItWorksSection extends React.PureComponent {
  static propTypes = {};
  render() {
    return (
      <Section id="how-it-works">
        {/* <Section style={{ backgroundColor: 'white', padding: '30px' }}> */}
        {/* <Subsection> */}
        {/* <h1>How it Works</h1> */}
        {/* </Subsection> */}
        {/* </Section> */}
        <Section>
          <Subsection>
            <TwoColumn id="step-1">
              <Grid.Column>
                <div className="step-desc">
                  {this.createCircle(1)}
                  <p>Fill Up a Form!</p>
                  <span className="gray">
                    State your requirements in our guided HomeMatch form,
                    designed to capture all your needs.
                  </span>
                </div>
              </Grid.Column>
              <Grid.Column>
                <ImageWrapper
                  src={Step1}
                  width="100%"
                  style={{ marginTop: '50px' }}
                />
              </Grid.Column>
            </TwoColumn>
            <div className="pad" />
            <TwoColumn reversed="computer vertically" id="step-2">
              <Grid.Column>
                <ImageWrapper src={Step2} width="100%" />
              </Grid.Column>
              <Grid.Column>
                <div className="step-desc">
                  {this.createCircle(2)}
                  <p>Pick your Professional!</p>
                  <span className="gray">
                    The HomeMatch will suggest professionals instantly. Start
                    choosing a few!
                  </span>
                </div>
              </Grid.Column>
            </TwoColumn>
            <div className="pad" />
            <TwoColumn>
              <Grid.Column>
                <div className="step-desc">
                  {this.createCircle(3)}
                  <p>Chat live with your professional!</p>
                  <span className="gray">
                    Discuss your home project with the professional and get your
                    services delivered!
                  </span>
                </div>
              </Grid.Column>
              <Grid.Column>
                <ImageWrapper src={Step3} width="100%" />
              </Grid.Column>
            </TwoColumn>
          </Subsection>
        </Section>
      </Section>
    );
  }
  createCircle(children) {
    return <div className="circle-label">{children}</div>;
  }
}
