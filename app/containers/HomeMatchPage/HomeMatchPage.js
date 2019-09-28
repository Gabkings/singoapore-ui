/* eslint-disable jsx-a11y/label-has-for,react/no-did-update-set-state,jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Modal } from 'semantic-ui-react';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import { DAEMON } from '../../utils/constants';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import homeMatchReducer, { HOMEMATCH_VIEW } from '../../reducers/homematch';
import saga from '../../sagas/user';

import './styles.css';
import PaperWrapper from '../../components/Base/Paper';
import Subsection from '../../components/Section/Subsection';
import HomeMatchImage1 from '../../images/homematch-1.png';
import ButtonWrapper from '../../components/Base/Button';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: HOMEMATCH_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  users: state.get(HOMEMATCH_VIEW).toJS(),
  [HOMEMATCH_VIEW]: state.get(HOMEMATCH_VIEW).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: USERS.MODEL, reducer });
const withHomeMatchReducer = injectReducer({
  key: HOMEMATCH_VIEW,
  reducer: homeMatchReducer,
});
const withSaga = injectSaga({
  key: USERS.MODEL,
  saga,
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class HomeMatchPage extends React.PureComponent {
  static propTypes = {
    users: PropTypes.object,
    location: PropTypes.object,
    goTo: PropTypes.func,
    dispatchAction: PropTypes.func,
  };
  state = {
    errorMessage: '',
    openSuccessModal: false,
  };
  render() {
    return (
      <TemplatePage {...this.props}>
        <Subsection
          id="home-match"
          style={{ width: '90%', marginTop: '20px', textAlign: 'left' }}
        >
          <PaperWrapper
            style={{ boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.09)' }}
          >
            <Subsection
              style={{ width: '90%', paddingTop: '20px', textAlign: 'left' }}
            >
              <h1>HomeMatch</h1>
              <p>Want much more qualified customers?</p>
              <p>Have customers contact you directly for home projects!</p>
              <p>This is entirely free but we need to ensure that:</p>
              <ul>
                <li>You are a verified business</li>
                <li>You are aware of the available options</li>
                <li>
                  Your business is ready for more customers and is responsive
                </li>
              </ul>
              <h2>Benefits of HomeMatch</h2>
              <ul>
                <li>Customers can chat with you directly and instantly.</li>
                <li>
                  Set your preferences to get the best match of customers
                  <img src={HomeMatchImage1} width="50%" />
                </li>
                <li>Higher positioning in the directory</li>
                <li>More customers, more reviews and more sales!</li>
              </ul>
              <h2>How to get started?</h2>
              <p>Simply fill this up.</p>
              <form
                className="ui form"
                onSubmit={e => {
                  e.preventDefault();
                  this.props.dispatchAction({
                    type: USERS.POST.REQUESTED,
                    payload: {
                      url: 'homematch_enquiry',
                      data: {
                        company_name: e.target.company_name.value,
                        name: e.target.name.value,
                        contact_number: e.target.contact_number.value,
                      },
                    },
                  });
                }}
              >
                <div className="field">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="Company Name"
                    required
                  />
                </div>
                <div className="field">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="field">
                  <label>Direct Contact Number</label>
                  <input
                    type="text"
                    name="contact_number"
                    placeholder="Direct Contact Number"
                    required
                  />
                </div>
                <ButtonWrapper
                  design="filled"
                  className="ui button"
                  type="submit"
                  disabled={this.props[HOMEMATCH_VIEW][USERS.MODEL].requesting}
                >
                  Submit
                </ButtonWrapper>
                <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
              </form>
              <Modal
                open={this.state.openSuccessModal}
                onClose={() => {
                  this.setState({ openSuccessModal: false });
                }}
              >
                <Subsection>
                  <h2>Thank you! Your enquiry is received</h2>
                </Subsection>
              </Modal>
            </Subsection>
          </PaperWrapper>
        </Subsection>
      </TemplatePage>
    );
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps[HOMEMATCH_VIEW][USERS.MODEL].requesting &&
      !this.props[HOMEMATCH_VIEW][USERS.MODEL].requesting
    ) {
      if (
        this.props[HOMEMATCH_VIEW][USERS.MODEL].msg &&
        this.props[HOMEMATCH_VIEW][USERS.MODEL].msg === 'success'
      ) {
        this.setState({ openSuccessModal: true });
      } else {
        this.setState({
          errorMessage: 'Sorry something went wrong, please try again.',
        });
      }
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withHomeMatchReducer,
  withSaga,
  withConnect,
)(HomeMatchPage);
