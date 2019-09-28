/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import queryString from 'query-string';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import Section from '../../components/Section/Section';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import CompanyList from '../../components/CompanyList';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import Subsection from '../../components/Section/Subsection';
import projectReducer, { PROJECT_VIEW } from '../../reducers/projects';
import { PROJECTS, USERS, LISTINGS } from '../../actions/restApi';
import ButtonWrapper from '../../components/Base/Button';
import PaperWrapper from '../../components/Base/Paper';
import './styles.css';
import OneColumn from '../../components/Section/OneColumn';
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
const withListingSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class ProjectsSelectPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func,
    [PROJECT_VIEW]: PropTypes.object,
  };
  state = {
    selected: [],
    openSuccessModal: false,
  };
  render() {
    return (
      <TemplatePage {...this.props}>
        <Section id="project-select">
          <Subsection>
            <PaperWrapper>
              <Subsection className="paper-subsection">
                {this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.requesting && (<Loader/>)}
                {this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST &&
                !this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.requesting &&
                this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.count > 0 && (
                  <h1>
                    Select professionals that you want to be contacted by<strong>:</strong>
                  </h1>
                )}
                {this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST &&
                !this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.requesting &&
                  this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.count === 0 && (
                  <h3>
                    Your Form Submission input has been sent. We will get back to you very soon. Thanks.
                  </h3>
                )}
                {this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST &&
                !this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.requesting &&
                this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.count > 0 && (
                  <CompanyList
                    companies={this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST}
                    selectable
                    onSelect={this.handleSelect}
                    selected={this.state.selected}
                    dispatchAction={this.props.dispatchAction}
                    user={this.props.user}
                  />
                )}
                {this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST &&
                !this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.requesting &&
                this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.count > 0 && (
                  <OneColumn id="send-container">
                    <ButtonWrapper
                      design="filled"
                      onClick={this.handleSubmit}
                      disabled={this.state.selected.length === 0}
                    >
                      SEND
                    </ButtonWrapper>
                    <Modal
                      open={this.state.openSuccessModal}
                      onClose={() => {
                        this.setState({openSuccessModal: false})
                      }}
                    >
                      <Subsection>
                        {this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.requesting && <Loader/>}
                        {!this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.requesting && (
                          <div>
                            <h3>Your input has been sent to the respective professionals chosen. Please allow some time for them to get back to you.</h3>
                            <ButtonWrapper
                              onClick={() => {
                                this.props.goTo({
                                  path: `/dashboard/chat?project=${this.state.query.project}`,
                                });
                              }}
                              design="filled"
                            >
                              Go to Chat
                            </ButtonWrapper>
                          </div>
                        )}
                      </Subsection>
                    </Modal>
                  </OneColumn>
                )}
              </Subsection>
            </PaperWrapper>
          </Subsection>
        </Section>
      </TemplatePage>
    );
  }
  componentWillMount() {
    this.props.dispatchAction({
      type: LISTINGS.LIST.REQUESTED,
      payload: {
        query: {
          ...queryString.parse(this.props.location.search),
          exclude_inactive: 'true',
          ranked: true,
          exclude_no_chat: true,
        },
      },
    });
    const query = queryString.parse(this.props.location.search);
    this.setState({ query });
    this.props.dispatchAction({
      type: PROJECTS.GET.REQUESTED,
      payload: {
        id: query.project,
      },
    });
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    const query = queryString.parse(this.props.location.search);
    if (
      prevProps[PROJECT_VIEW][PROJECTS.MODEL].GET.listings === undefined &&
      this.props[PROJECT_VIEW][PROJECTS.MODEL].GET.listings
    ) {
      const prev =
        this.props[PROJECT_VIEW][PROJECTS.MODEL].GET.listings.slice() || [];
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ selected: prev.concat(this.state.selected) });
    }
    if (
      this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.listings &&
      prevProps[PROJECT_VIEW][PROJECTS.MODEL].POST.listings !==
        this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.listings &&
      this.state.selected.length > 0
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({openSuccessModal: true})
    }
    if (
      prevProps[PROJECT_VIEW][LISTINGS.MODEL].LIST.count !==
        this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.count &&
      this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.count === 0
    ) {
      this.props.dispatchAction({
        type: PROJECTS.POST.REQUESTED,
        payload: {
          id: query.project,
          url: 'no_listing_chat',
        },
      });
    }
  }
  handleSelect = listing => {
    const currentlySelected = this.state.selected.indexOf(listing.id) !== -1;
    if (currentlySelected) {
      const newArray = this.state.selected.slice();
      newArray.splice(this.state.selected.indexOf(listing.id), 1);
      this.setState({ selected: newArray });
    } else {
      const newArray = this.state.selected.slice();
      newArray.push(listing.id);
      this.setState({ selected: newArray });
    }
  };
  handleSubmit = () => {
    const listings = this.state.selected;
    if (listings && listings.length > 0) {
      if (listings.length > 3) {
        window.alert('Only up to 3 professionals can be selected');
      } else {
        // eslint-disable-next-line camelcase
        const ranked_listings = this.props[PROJECT_VIEW][LISTINGS.MODEL].LIST.results.map(l => l.id);
        this.props.dispatchAction({
          type: PROJECTS.POST.REQUESTED,
          payload: {
            data: {
              listings,
              ranked_listings,
            },
            id: this.state.query.project,
            url: 'select_listings',
          },
        });
      }

    } else if (listings && listings.length === 0) {
      // eslint-disable-next-line no-alert
      window.alert('No listings selected');
    }
  };
}

export default compose(
  // Put `withReducer` before `withConnect`
  withProjectReducer,
  withProjectSaga,
  withListingSaga,
  withConnect,
)(ProjectsSelectPage);
// export default ProjectsCreatePage;
