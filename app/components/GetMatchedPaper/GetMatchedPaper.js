import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Container } from 'semantic-ui-react';
import PaperWrapper from '../Base/Paper/index';
import SearchBar from '../SearchBar/index';
import ThreeColumn from '../Section/ThreeColumn';
import ImageWrapper from '../Base/Image/index';
import Subsection from '../Section/Subsection';

import './get-matched-paper.css';
// import { getS3Image } from '../../utils/images';

// const Step1 = getS3Image('/images/DirectoryPage/step1.jpg');
// const Step2 = getS3Image('/images/DirectoryPage/step2.jpg');
// const Step3 = getS3Image('/images/DirectoryPage/step3.jpg');
import Step1 from './icon/1.png';
import Step2 from './icon/2.png';
import Step3 from './icon/3.png';

function GetMatchedPaper(props) {
  return (
    <PaperWrapper id="get-matched-paper">
      <Subsection>
        <h2>Get matched to a professional within 60s</h2>
        <SearchBar
          placeholder="Keywords"
          onSubmit={props.onSearch}
          onChange={props.onSearchChange}
          fluid
        />
        <Container id="steps">
          <ThreeColumn>
            <Grid.Column>
              <Subsection>
                <ImageWrapper src={Step1} width="100%" />
                <h4>Step 1</h4>
              </Subsection>
            </Grid.Column>
            <Grid.Column>
              <Subsection>
                <ImageWrapper src={Step2} width="100%" />
                <h4>Step 2</h4>
              </Subsection>
            </Grid.Column>
            <Grid.Column>
              <Subsection>
                <ImageWrapper src={Step3} width="100%" />
                <h4>Step 3</h4>
              </Subsection>
            </Grid.Column>
          </ThreeColumn>
        </Container>
      </Subsection>
    </PaperWrapper>
  );
}

GetMatchedPaper.propTypes = {
  onSearch: PropTypes.func,
  onSearchChange: PropTypes.func,
};

export default GetMatchedPaper;
