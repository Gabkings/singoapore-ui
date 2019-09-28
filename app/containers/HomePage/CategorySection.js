import React from 'react';
// import PropTypes from 'prop-types';
import { Grid, Image } from 'semantic-ui-react';
import PaperWrapper from '../../components/Base/Paper/index';
import Subsection from '../../components/Section/Subsection';
import Section from '../../components/Section/Section';
import LinkWrapper from '../../components/Base/Link/index';
import './category.css';
import { getS3Image } from '../../utils/images';

const dots = getS3Image('/images/HomePage/dots.png');
const houseImage = getS3Image('/images/new-images/001-house.png');
const localMovingImage = getS3Image('/images/new-images/local-moving.jpeg');
const handyImage = getS3Image('/images/new-images/003-tools.png');
const homeCleaningImage = getS3Image('/images/new-images/home-cleaning.jpeg');
const airconditionerImage = getS3Image(
  '/images/new-images/005-air-conditioner.png',
);

/* eslint-disable react/prefer-stateless-function */

export default class CategorySection extends React.PureComponent {
  static propTypes = {
    // categories: PropTypes.array,
    // search: PropTypes.func,
    // goTo: PropTypes.func,
  };

  renderShape() {
    return (
      <svg
        className="shape"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 265 279"
        width="188"
        height="198"
      >
        <path
          fillRule="evenodd"
          fill="rgba(255, 177, 0, 0.071)"
          d="M10.236,176.579 C-20.881,52.430 22.052,-5.416 148.893,0.502 C280.657,6.649 302.203,72.262 202.694,194.703 C104.750,315.219 41.951,303.117 10.236,176.579 Z"
        />
      </svg>
    );
  }

  render() {
    return (
      <Section style={{ backgroundColor: 'white', marginTop: '0px' }}>
        <div id="dotted-line">{this.renderShape()}</div>
        <Subsection style={{ width: '77%' }}>
          <PaperWrapper id="category-paper">
            <Grid
              columns={6}
              doubling
              style={{ marginRight: 0, marginLeft: 0 }}
            >
              <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <a href="/services/interior-designing">
                      <button className="category-button">
                        <img
                          src={houseImage}
                          width="40px"
                          height="40px"
                          alt=""
                        />
                        <p>Interior Design</p>
                      </button>
                    </a>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <a href="/services/local-moving">
                      <button className="category-button">
                        <img
                          src={localMovingImage}
                          width="40px"
                          height="40px"
                          alt=""
                        />
                        <p>Local Moving</p>
                      </button>
                    </a>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <a href="/services/airconditioning">
                      <button className="category-button">
                        <img
                          src={airconditionerImage}
                          width="40px"
                          height="40px"
                          alt=""
                        />
                        <p>Aircon</p>
                      </button>
                    </a>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <a href="/services/handyman">
                      <button className="category-button">
                        <img
                          src={handyImage}
                          width="40px"
                          height="40px"
                          alt=""
                        />
                        <p>HandyMan</p>
                      </button>
                    </a>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <a href="/services/house-cleaning">
                      <button className="category-button">
                        <img
                          src={homeCleaningImage}
                          width="40px"
                          height="40px"
                          alt=""
                        />
                        <p>Home Cleaning</p>
                      </button>
                    </a>
                  </div>
                </Grid.Column>

                <Grid.Column id="view-all">
                  <LinkWrapper className="category-button " href="/services">
                    <div id="category-button-content">
                      <Image src={dots} />
                      <p>View All</p>
                    </div>
                  </LinkWrapper>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </PaperWrapper>
        </Subsection>
      </Section>
    );
  }
}
