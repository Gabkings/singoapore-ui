/* eslint-disable no-underscore-dangle,no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import v4 from 'uuid/v4';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Grid, Modal } from 'semantic-ui-react';
import Section from '../../components/Section/Section';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import Card from '../../components/Base/Card/Card';
import CardHeader from '../../components/Base/Card/CardHeader';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import Subsection from '../../components/Section/Subsection';
import projectReducer, { PROJECT_VIEW } from '../../reducers/projects';
import { PROJECTS, USERS } from '../../actions/restApi';
import ThreeColumn from '../../components/Section/ThreeColumn';
import ImageWrapper from '../../components/Base/Image';
import RocketImage from '../../images/projects-rocket.png';
import './styles.css';
import CardContent from '../../components/Base/Card/CardContent';
import ButtonWrapper from '../../components/Base/Button';
import LinkWrapper from '../../components/Base/Link';
import TwoColumn from '../../components/Section/TwoColumn';
import PencilIcon from '../../images/pencil-icon.png';
import CustomPagination from '../../components/CustomPagination';
import Loader from '../Common/Loader';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload, contentType }) => {
    dispatch({ type, payload, view: PROJECT_VIEW, contentType });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [PROJECT_VIEW]: state.get(PROJECT_VIEW).toJS(),
  user: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withProjectReducer = injectReducer({
  key: PROJECT_VIEW,
  reducer: projectReducer,
});
const withProjectSaga = injectSaga({
  key: PROJECTS.MODEL,
  saga: saga(PROJECTS),
  mode: DAEMON,
});

const PAGE_LIMIT = 6;

/* eslint-disable react/prefer-stateless-function */
class ProjectsListPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func,
  };
  state = {
    openHiredModal: false,
  }
  render() {
    const projects = this.props[PROJECT_VIEW][PROJECTS.MODEL].LIST;
    const query = queryString.parse(this.props.location.search);
    const pageNumber =
      query.offset && query.limit ? query.offset / query.limit + 1 : 1;
    return (
      <TemplatePage {...this.props}>
        <Section id="projects-list">
          <Subsection style={{ padding: 0 }}>
            <div className="title-wrapper">
              <ImageWrapper src={RocketImage} height="40px" />
              <h1>Projects</h1>
            </div>
            <Subsection>
              {projects.requesting && (
                <Loader/>
              )}
              {!projects.requesting && projects.results && projects.results.length === 0 && (
                <h3>You have no projects yet. Fill up a form of a particular service by doing a search in the search bar above.</h3>
              )}
              {!projects.requesting && projects.results && projects.results.length > 0 && (
                <ThreeColumn stackable>
                  {projects.results.map(project => (
                    <Grid.Column key={v4()}>
                      <Card className="project-card">
                        <CardHeader
                          style={{
                            backgroundColor: 'rgba(235, 235, 235, 0.251)',
                          }}
                        >
                          <Subsection
                            style={{ width: '90%', paddingTop: '10px' }}
                          >
                            <TwoColumn stackable>
                              <Grid.Column>
                                <div className="card-header-date-wrapper">
                                  <p>
                                    {new Date(
                                      project.created_at,
                                    ).toDateString()}
                                  </p>
                                </div>
                              </Grid.Column>
                              <Grid.Column>
                                <div className="card-header-type-wrapper">
                                  <span>Type: </span>
                                  <span>
                                    <ButtonWrapper
                                      design="outline"
                                      className="category-button"
                                    >
                                      {project.form_data &&
                                        this.getCategoryName(
                                          JSON.parse(project.form_data)
                                            .category,
                                        )}
                                    </ButtonWrapper>
                                  </span>
                                </div>
                              </Grid.Column>
                            </TwoColumn>
                            <h2 className="card-title">{project.title}</h2>
                          </Subsection>
                        </CardHeader>
                        <CardContent>
                          <Subsection>
                            <div className="card-content">
                              <ButtonWrapper
                                design="filled"
                                className="card-button"
                                onClick={() => {
                                  this.props.goTo({
                                    path: `/dashboard/chat?project=${
                                      project.id
                                    }`,
                                  });
                                }}
                              >
                                Speak to shortlisted professionals
                              </ButtonWrapper>
                              <LinkWrapper
                                href={`/dashboard/projects/select?project=${
                                  project.id
                                }`}
                                className="card-select-link"
                              >
                                Select more professionals to speak to
                              </LinkWrapper>
                            </div>
                          </Subsection>
                        </CardContent>
                        <CardContent>
                          <Subsection style={{ paddingBottom: '0px' }}>
                            <div className="card-status-content">
                              <div>
                                <span>Status: </span>
                                <span>
                                  <strong>{project.status}</strong>
                                </span>
                                <button className="circled" onClick={() => {this.setState({openHiredModal: project.id})}}>
                                  <ImageWrapper src={PencilIcon} />
                                </button>
                              </div>
                              <div>
                                <span>Professional Hired: </span>
                                <span>
                                  {project.hired_name && (
                                    <strong>{project.hired_name}</strong>
                                  )}
                                  {project.hired === null && (
                                    <strong>None</strong>
                                  )}
                                </span>
                                <Modal
                                  trigger={
                                    <button
                                      className="circled"
                                      onClick={() => {
                                        this.setState({openHiredModal: project.id});
                                      }}
                                    >
                                      <ImageWrapper src={PencilIcon} />
                                    </button>
                                  }
                                  open={this.state.openHiredModal === project.id}
                                  onClose={() => {this.setState({openHiredModal: false})}}
                                  dimmer="inverted"
                                  size="mini"
                                  closeIcon
                                >
                                  <Subsection>
                                    <form
                                      onSubmit={e => {
                                        e.preventDefault();
                                        this.props.dispatchAction({
                                          type: PROJECTS.PATCH.REQUESTED,
                                          payload: {
                                            id: project.id,
                                            data: {
                                              hired: e.target.hired.value,
                                              status: e.target.hired.value === '' ? 'Pending' : 'Hired',
                                            },
                                          },
                                        });
                                        this.setState({openHiredModal: false});
                                      }}
                                    >
                                      <div className="hired-form">
                                        <h3>Hired Professional</h3>
                                        <select className="ui dropdown" name="hired" defaultValue={project.hired}>
                                          <option value="">None</option>
                                          {project.ranked_listings_data.map(d => (
                                            <option value={d.id}>{d.name}</option>
                                          ))}
                                        </select>
                                        <ButtonWrapper design="filled">SAVE</ButtonWrapper>
                                      </div>
                                    </form>
                                  </Subsection>
                                </Modal>
                              </div>
                            </div>
                          </Subsection>
                        </CardContent>
                      </Card>
                    </Grid.Column>
                  ))}
                </ThreeColumn>
              )}
            </Subsection>
            <Subsection>
              {projects.count > 0 && (
                <CustomPagination
                  activePage={pageNumber}
                  totalPages={Math.ceil(projects.count / PAGE_LIMIT)}
                  onPageChange={(e, data) => {
                    this.goToPage(data.activePage);
                  }}
                />
              )}
            </Subsection>
          </Subsection>
        </Section>
      </TemplatePage>
    );
  }
  fetchProjects() {
    const { consumerId } = this.props.user.LOAD_AUTH.data;
    if (consumerId !== -1) {
      this.props.dispatchAction({
        type: PROJECTS.LIST.REQUESTED,
        payload: {
          query: {
            ...queryString.parse(this.props.location.search),
            consumer: consumerId,
            ordering: '-created_at',
            limit: PAGE_LIMIT,
          },
        },
      });
    }
  }
  goToPage(pageNumber) {
    const limit = PAGE_LIMIT;
    const offset = Math.max((pageNumber - 1) * PAGE_LIMIT, 0);
    const query = `?limit=${limit}${offset === 0 ? '' : `&offset=${offset}`}`;
    const target = `${this.props.location.pathname}${query}`;
    this.props.goTo({ path: target });
  }
  componentDidMount() {
    this.fetchProjects();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (
      this.props.user.LOAD_AUTH.data.consumerId &&
      this.props.user.LOAD_AUTH.data.consumerId !==
        prevProps.user.LOAD_AUTH.data.consumerId &&
      this.props.user.LOAD_AUTH.data.consumerId > 0
    ) {
      this.fetchProjects();
    }
    if (this.props.location.search !== prevProps.location.search) {
      this.fetchProjects();
    }
  }

  getCategoryName = slug => {
    if (slug === undefined) {
      return '';
    }
    const result = slug
      .split('-')
      .map(
        string =>
          string.length > 0
            ? string[0].toUpperCase() + string.slice(1).toLowerCase()
            : string,
      )
      .join(' ');
    return result;
  };
}

export default compose(
  // Put `withReducer` before `withConnect`
  withProjectReducer,
  withProjectSaga,
  withConnect,
)(ProjectsListPage);
// export default ProjectsListPage;
