/* eslint-disable prettier/prettier */
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import renderHTML from 'react-render-html';

import Section from '../../components/Section/Section';
import Subsection from '../../components/Section/Subsection';
import PaperWrapper from '../../components/Base/Paper';
import injectReducer from '../../utils/injectReducer';
import servicesReducer from '../../reducers/services';
import injectSaga from '../../utils/injectSaga';
import { CATEGORIES, LISTINGS } from '../../actions/restApi';
import categorySaga from '../../sagas/category';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import './styles.css';
import LinkWrapper from '../../components/Base/Link';
import { categories } from '../ServicesPage/data';
import { getS3Image } from '../../utils/images';
const houseImage = getS3Image('/images/new-images/001-house.png');

export const SERVICES_VIEW = 'services';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: SERVICES_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [SERVICES_VIEW]: state.get(SERVICES_VIEW).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: SERVICES_VIEW,
  reducer: servicesReducer,
});

const withSaga = injectSaga({
  key: `${SERVICES_VIEW}/${CATEGORIES.MODEL}`,
  saga: categorySaga,
  mode: DAEMON,
});
const withListingSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class MostPopularProjects extends React.PureComponent {
  static propTypes = {
    // [SERVICES_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
  };

  setInitialState = () => {
    const categoriesMap = {};
    const popularList = [];
    const parentMap = {};
    categories.results.forEach(category => {
      categoriesMap[category.id] = category;
      if (category.popular !== null) {
        popularList.push(category.id);
      }
      category.parent.forEach(p => {
        if (parentMap[p] === undefined) {
          parentMap[p] = [];
        }
        parentMap[p].push(category.id);
      });
    });

    popularList.sort((a, b) => categoriesMap[a].popular - categoriesMap[b].popular);
    while(popularList.length > 12) {
      popularList.pop()
    }
    return { categoriesMap, popularList, parentMap };
  };

  state = this.setInitialState();
  renderMoreServicesPaper = p => {
    const { categoriesMap, parentMap } = this.state;
    return (
      categoriesMap[p] && (
        <PaperWrapper className="paper category-links" key={v4()}>
          <div className="category-links-title">
            <LinkWrapper href={`/services/${categoriesMap[p].slug}`}>
              <h3>{renderHTML(categoriesMap[p].name)}</h3>
            </LinkWrapper>
          </div>
          <div className="category-links-links">
            {parentMap[p].map(s => (
              <p key={v4()}>
                <LinkWrapper
                  key={v4()}
                  href={`/services/${categoriesMap[s].slug}`}
                >
                  {renderHTML(categoriesMap[s].name)}
                </LinkWrapper>
              </p>
            ))}
          </div>
        </PaperWrapper>
      )
    );
  };
  renderMoreServices1Column = () => {
    const { categoriesMap, parentMap } = this.state;
    const col = Object.keys(parentMap)
      .sort(
        (a, b) =>
          categoriesMap[a] &&
          categoriesMap[b] &&
          categoriesMap[a].name.trim() < categoriesMap[b].name.trim()
            ? -1
            : 1,
      )
      .map(p => this.renderMoreServicesPaper(p));
    return (
      <Grid.Column key={v4()} className="category-links">
        {col}
      </Grid.Column>
    );
  };
  renderMoreServices3Columns = () => {
    const { categoriesMap, parentMap } = this.state;
    // this method tries to create 3 roughly equal length columns while
    // still making sure that the columns are alphabetically sorted downwards
    const columns = [[], [], []];
    const colCount = [0, 0, 0];
    Object.keys(parentMap)
      .sort(
        (a, b) =>
          categoriesMap[a] &&
          categoriesMap[b] &&
          categoriesMap[a].name.trim() < categoriesMap[b].name.trim()
            ? -1
            : 1,
      )
      .forEach(p => {
        const categoryPaper = this.renderMoreServicesPaper(p);
        if (categoryPaper) {
          const indexOfMinValue = colCount.reduce(
            (iMin, x, i, arr) => (x < arr[iMin] ? i : iMin),
            0,
          );
          colCount[indexOfMinValue] += parentMap[p].length + 1;
          columns[indexOfMinValue].push(categoryPaper);
        }
      });

    return columns.map(col => (
      <Grid.Column key={v4()} className="category-links">
        {col}
      </Grid.Column>
    ));
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
    const { categoriesMap, popularList } = this.state;
    return (
      <Section style={{ backgroundColor: '#FAFAFA', marginTop: '0px' }}>
        <div id="dotted-line">{this.renderShape()}</div>
        <Subsection style={{ width: '77%' }}>
          {/* <div style={{ margin: '0px 0px 20px 0px' }}>
            <h2>Most Popular Projects</h2>
          </div> */}
          <PaperWrapper id="category-paper">
            <Grid
              columns={6}
              doubling
              style={{ margin: '-50px 0px 10px 0px', padding: '20px 0px' }}
            >
              <Grid.Row className="grid-row-popular-project" style={{ paddingTop: 0, paddingBottom: 0 }}>
                {popularList.map(p => (
                  <Grid.Column key={v4()} id="grid-col-popular-project">
                    <LinkWrapper
                      href={`/services/${categoriesMap[p].slug}`}
                    >
                      <div id="home-service-div" className="column category-col right_border">
                        <div className="left-border no-border" />
                        <button className="category-button">
                          <img
                            src={houseImage}
                            // src={categoriesMap[p].image}
                            width="40px"
                            height="40px"
                            alt={categoriesMap[p].name}
                            title={categoriesMap[p].name}
                          />
                          <p>{categoriesMap[p].name}</p>
                        </button>
                      </div>
                    </LinkWrapper>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </PaperWrapper>
        </Subsection>
      </Section>
    )
  }

  componentDidMount() {
    this.props.dispatchAction({
      type: CATEGORIES.LIST.REQUESTED,
      payload: { query: { limit: 300 }, showSpinner: false },
    });
  }

  componentWillReceiveProps(nextProps) {
    const categoriesMap = {};
    const popularList = [];
    const parentMap = {};
    nextProps[SERVICES_VIEW][CATEGORIES.MODEL].LIST.results.forEach(
      category => {
        categoriesMap[category.id] = category;
        if (category.popular !== null) {
          popularList.push(category.id);
        }
        category.parent.forEach(p => {
          if (parentMap[p] === undefined) {
            parentMap[p] = [];
          }
          parentMap[p].push(category.id);
        });
      },
    );
    popularList.sort((a, b) => categoriesMap[a].popular - categoriesMap[b].popular);
    while(popularList.length > 12) {
      popularList.pop()
    }
    this.setState({ categoriesMap, popularList, parentMap });
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withListingSaga,
  withConnect,
)(MostPopularProjects);
