/* eslint-disable prettier/prettier */
import React from 'react';
import { Grid } from 'semantic-ui-react';
import Section from '../../components/Section/Section';
import Subsection from '../../components/Section/Subsection';
import PaperWrapper from '../../components/Base/Paper';
import { getS3Image } from '../../utils/images';
const houseImage = getS3Image('/images/new-images/001-house.png');
const handyImage = getS3Image('/images/new-images/003-tools.png');
const airconditionerImage = getS3Image(
  '/images/new-images/005-air-conditioner.png',
);
/* eslint-disable react/prefer-stateless-function */
class MostPopularProjects extends React.PureComponent {
  
  render() {
    return (
      <Section style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', marginTop: '0px' }}>
        <Subsection style={{ width: '77%' }}>
          <div style={{ margin: '0px 0px 40px 0px' }}>
            <h2>Most Popular Projects</h2>
          </div>
          <PaperWrapper id="category-paper">
            <Grid
              columns={6}
              doubling
              style={{ margin: '10px 0px 10px 0px', padding: '20px 0px' }}
            >
              <Grid.Row className="grid-row-popular-project" style={{ padding: 0, margin: '0px 0px 40px 0px' }}>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={houseImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Kitchen Remodel</p>
                    </button>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={houseImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Bathroom Remodel</p>
                    </button>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={airconditionerImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Heating & Cooling</p>
                    </button>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={airconditionerImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Flooring & Hardwood</p>
                    </button>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={handyImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Windows & Doors</p>
                    </button>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={handyImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Roofling & Gutters</p>
                    </button>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="grid-row-popular-project" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={houseImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Landscape</p>
                    </button>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={houseImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Painting & Staining</p>
                    </button>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={airconditionerImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Swimming Pools & Spas</p>
                    </button>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={airconditionerImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Concrete, Brick & Stone</p>
                    </button>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={handyImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Decks & Porchers</p>
                    </button>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="column category-col right_border">
                    <div className="left-border no-border" />
                    <button className="category-button">
                      <img
                        src={handyImage}
                        width="40px"
                        height="40px"
                        alt=""
                      />
                      <p>Siding</p>
                    </button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </PaperWrapper>
        </Subsection>
      </Section>

    );
  }
}

export default MostPopularProjects
