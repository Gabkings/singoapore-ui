/* eslint-disable no-underscore-dangle,camelcase */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
// import queryString from 'query-string';
import Section from '../../components/Section/Section';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import Subsection from '../../components/Section/Subsection';
import projectReducer, { PROJECT_VIEW } from '../../reducers/projects';
import { PROJECTS, USERS } from '../../actions/restApi';
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

/* eslint-disable react/prefer-stateless-function */
class ProjectsCreatePage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func,
  };
  render() {
    return (
      <TemplatePage {...this.props}>
        <Section>
          <Subsection style={{ padding: 0 }}>
            {this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.requesting && (
              <Loader />
            )}
          </Subsection>
        </Section>
      </TemplatePage>
    );
  }
  componentDidMount() {
    if (this.props.user.user.username) {
      this.props.dispatchAction({
        type: PROJECTS.POST.REQUESTED,
        payload: {
          data: {
            email: this.props.user.user.username,
          },
          url: 'create_from_form_submission_email',
        },
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (!prevProps.user.user.username && this.props.user.user.username) {
      this.props.dispatchAction({
        type: PROJECTS.POST.REQUESTED,
        payload: {
          data: {
            email: this.props.user.user.username,
          },
          url: 'create_from_form_submission_email',
        },
      });
    }
    if (this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.results) {
      if (this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.results.length === 0) {
        this.props.goTo({
          path: `/dashboard/projects`,
        });
      } else if (
        this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.results.length >= 1
      ) {
        this.props.goTo({
          // path: `/dashboard/projects/select?project=${
          //   this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.results[0].id
          // }`,
          path: `/dashboard/chat?project=${
            this.props[PROJECT_VIEW][PROJECTS.MODEL].POST.results[0].id
          }`,
        });
      }
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withProjectReducer,
  withProjectSaga,
  withConnect,
)(ProjectsCreatePage);
// export default ProjectsCreatePage;
