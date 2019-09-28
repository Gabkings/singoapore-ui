import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, Modal } from 'semantic-ui-react';
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
import ThreeColumn from '../../components/Section/ThreeColumn';
import PaperWrapper from '../../components/Base/Paper';
import ImageWrapper from '../../components/Base/Image';

import { cardInfo } from './content';
import TwoColumn from '../../components/Section/TwoColumn';
import ButtonWrapper from '../../components/Base/Button';
import { CONTACT_VIEW } from './constant';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: CONTACT_VIEW });
  },
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
class ContactPage extends React.PureComponent {
  static propTypes = {
    users: PropTypes.object,
    location: PropTypes.object,
    goTo: PropTypes.func,
    dispatchAction: PropTypes.func,
  };
  state = {
    openSuccessModal: false,
  };
  render() {
    return (
      <TemplatePage {...this.props}>
        <Subsection id="contact-page">
          <Subsection>
            <span className="sub-title">
              We will get back to you very soon!
            </span>
            <h1>
              Contact Us Today<strong style={{ color: 'orange' }}>!</strong>
            </h1>
            <Subsection className="three-col-wrapper">
              <ThreeColumn stackable>
                {cardInfo.map(data => (
                  <Grid.Column key={v4()}>
                    <Subsection>
                      <PaperWrapper className="contact-paper">
                        <Subsection>
                          <Subsection className="top-subsection">
                            <ImageWrapper src={data.img} />
                            <h2>{data.title}</h2>
                          </Subsection>
                          <hr />
                          <Subsection>{data.info}</Subsection>
                        </Subsection>
                      </PaperWrapper>
                    </Subsection>
                  </Grid.Column>
                ))}
              </ThreeColumn>
            </Subsection>
          </Subsection>
          <Subsection>
            <PaperWrapper>
              <Subsection className="map-paper-subsection">
                <TwoColumn>
                  <Grid.Column>
                    <div className="contact-form-wrapper">
                      <Subsection id="contact-form">
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            this.props.dispatchAction({
                              type: USERS.POST.REQUESTED,
                              payload: {
                                url: 'contact',
                                data: {
                                  name: e.target.name.value,
                                  email: e.target.email.value,
                                  subject: e.target.subject.value,
                                  message: e.target.message.value,
                                },
                              },
                            });
                          }}
                        >
                          <div className="ui left input fluid">
                            <input
                              name="name"
                              type="text"
                              placeholder="Name*"
                              required
                            />
                          </div>
                          <div className="ui left input fluid">
                            <input
                              name="email"
                              type="email"
                              placeholder="Email*"
                              required
                            />
                          </div>
                          <div className="ui left input fluid">
                            <input
                              name="subject"
                              type="text"
                              placeholder="Subject*"
                              required
                            />
                          </div>
                          <div className="ui left input fluid">
                            <input
                              name="message"
                              type="text"
                              placeholder="Message*"
                              required
                            />
                          </div>
                          <div className="submit-button-wrapper">
                            <ButtonWrapper design="filled">
                              Submit Now
                            </ButtonWrapper>
                          </div>
                        </form>
                        <Modal
                          open={this.state.openSuccessModal}
                          onClose={() => {
                            this.setState({ openSuccessModal: false });
                          }}
                        >
                          <Subsection>
                            <h2>
                              Thank you for contacting us, your message was
                              successfully sent
                            </h2>
                          </Subsection>
                        </Modal>
                      </Subsection>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <iframe
                      title="map"
                      width="100%"
                      height="450"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA6KmUyMUG8y-QQw-xyWNl98jo-PSabY-Q&q=51+Goldhill+Plaza,+Singapore+308900"
                      allowFullScreen
                    />
                  </Grid.Column>
                </TwoColumn>
              </Subsection>
            </PaperWrapper>
          </Subsection>
        </Subsection>
      </TemplatePage>
    );
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (
      prevProps.users.contact === undefined &&
      this.props.users.contact &&
      this.props.users.contact.msg === 'success'
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ openSuccessModal: true });
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(ContactPage);
