/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import { DAEMON } from '../../utils/constants';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import './styles.css';
import Subsection from '../../components/Section/Subsection';
import { WEB_URL } from '../../utils/api';
import PaperWrapper from '../../components/Base/Paper';
import BusinessProfileImage0 from '../../images/business-profile-0.png';
import BusinessProfileImage1 from '../../images/business-profile-1.png';
import BusinessProfileImage2 from '../../images/business-profile-2.png';
import BusinessProfileImage3 from '../../images/business-profile-3.png';
import BusinessProfileImage4 from '../../images/business-profile-4.png';

const mapDispatchToProps = dispatch => ({
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  users: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: USERS.MODEL, reducer });
const withSaga = injectSaga({
  key: USERS.MODEL,
  saga,
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class BusinessProfilePage extends React.PureComponent {
  static propTypes = {
    users: PropTypes.object,
    location: PropTypes.object,
    goTo: PropTypes.func,
  };
  state = {};
  render() {
    return (
      <TemplatePage {...this.props}>
        <Subsection
          id="business-profile"
          style={{ width: '90%', marginTop: '20px' }}
        >
          <PaperWrapper
            style={{ boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.09)' }}
          >
            <Subsection
              style={{ width: '90%', paddingTop: '20px', textAlign: 'left' }}
            >
              <h1>Business Profile</h1>
              <p>Create a free business profile on SGHomeNeeds</p>
              <img src={BusinessProfileImage0} width="100%" />
              <h2>
                Start getting more eyeballs and customers to your business!
              </h2>
              <ul>
                <li>Get accessed to more customers</li>
                <li>Customers will be able to contact you directly</li>
                <li>Web presence on Google</li>
                <li>Share portfolios and gain reviews</li>
              </ul>
              <h2>How to get started?</h2>
              <ul>
                <li>
                  Sign up (<a href="/register-merchant">{`${WEB_URL}/register-merchant`}</a>)
                  with an account
                  <p>
                    NOTE: If you are signed in or signed up as a customer, you
                    will not be able to register as a merchant with the same
                    email address.
                  </p>
                  <p>Please contact our live chat or email us for support.</p>
                  <img src={BusinessProfileImage1} width="50%" />
                </li>
                <li>
                  Once you confirm your email, you can add your listing in your
                  dashboard!
                  <img src={BusinessProfileImage2} width="80%" />
                </li>
                <li>
                  Note that listings are subjected to approval. We only local
                  registered companies, in the home industry, providing services
                  to customers directly.
                </li>
                <li>
                  Once you listing has been approved, it will be published and
                  you can edit your listing by adding FAQ, images and more
                  information.
                  <img src={BusinessProfileImage3} width="100%" />
                </li>
                <li>
                  Next, head on add your gallery too. Do make sure that the
                  gallery is tied to an existing listing.
                  <img src={BusinessProfileImage4} width="100%" />
                </li>
                <li>
                  Check out <a href="/homematch">HomeMatch</a>. HomeMatch
                  matches qualified customers/leads to you directly. HomeMatch
                  is subjected to individual merchants. To check your
                  eligibility for HomeMatch, please fill in the form{' '}
                  <a href="/homematch">here</a>.
                </li>
              </ul>
            </Subsection>
          </PaperWrapper>
        </Subsection>
      </TemplatePage>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(BusinessProfilePage);
