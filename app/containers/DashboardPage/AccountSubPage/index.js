import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Message, Icon } from 'semantic-ui-react';
import Subsection from '../../../components/Section/Subsection';
import Card from '../../../components/Base/Card/Card';
import CardContent from '../../../components/Base/Card/CardContent';
import { USERS } from '../../../actions/restApi';
import { APPLICATION_JSON } from '../../../utils/actionsUtil';
import './styles.css';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';
import { AccountOptions } from './content';

/* eslint-disable react/prefer-stateless-function */
export default class AccountSubPage extends React.PureComponent {
  static propTypes = {
    profile: PropTypes.object,
    currentTab: PropTypes.string,
    user: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
  };
  state = {
    open: '',
  };

  // eslint-disable-next-line no-unused-vars
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log('this.props.user &&\n' +
  //     '      this.props.user.user &&\n' +
  //     '      !prevProps.user.user.is_deactivated &&\n' +
  //     '      this.props.user.user.is_deactivated',this.props.user &&
  //     this.props.user.user &&
  //     !prevProps.user.user.is_deactivated &&
  //     this.props.user.user.is_deactivated)
  //   if (
  //     this.props.user &&
  //     this.props.user.user &&
  //     prevProps.user.user.is_deactivated &&
  //     !this.props.user.user.is_deactivated
  //   ) {
  //     this.props.dispatchAction({
  //       type: USERS.LOGOUT.REQUESTED,
  //     });
  //   }
  // }

  updateUser = payload => {
    this.props.dispatchAction({ type: USERS.PATCH.REQUESTED, payload });
  };
  updateUserPassword = payload => {
    this.props.dispatchAction({ type: USERS.POST.REQUESTED, payload });
  };

  renderModal({ requestKey, formFieldProps, customTrigger }) {
    const trigger = customTrigger || (
      <button
        className="ui button"
        onClick={() => {
          this.setState({ open: requestKey });
        }}
      >
        Edit
      </button>
    );
    return (
      <Modal
        size="mini"
        trigger={trigger}
        open={this.state.open === requestKey}
        onClose={() => this.setState({ open: '' })}
      >
        <Subsection>
          <Form
            onSubmit={formData => {
              const data = {
                [requestKey]: formData.target[requestKey].value,
              };
              if (requestKey === 'username') {
                data.email = formData.target[requestKey].value;
              }
              this.updateUser({
                id: this.props.user.user.id,
                data,
                contentType: APPLICATION_JSON,
              });
              this.setState({ open: '' });
            }}
          >
            <Form.Field name={requestKey} {...formFieldProps} />
            <button className="ui button" type="submit">
              Submit
            </button>
            <Message success header="Form Submitted" />
          </Form>
        </Subsection>
      </Modal>
    );
  }

  renderSettingsCardContent({ title, value, modalOptions }) {
    return (
      <CardContent key={title}>
        <div className="account-settings-row">
          <div className="settings-title">
            <h4>
              {title}
              <span>{value}</span>
            </h4>
          </div>
          {modalOptions ? (
            <div className="settings-edit">
              {this.renderModal({
                ...modalOptions,
              })}
            </div>
          ) : null}
        </div>
      </CardContent>
    );
  }

  render() {
    const { currentTab, user } = this.props;
    const accountOptionsJsx = AccountOptions.map(option => {
      const title = `${option.formFieldProps.label}: `;
      const value = user.user[option.fieldName];
      const modalOptions = {
        requestKey: option.requestKey,
        formFieldProps: option.formFieldProps,
      };
      return this.renderSettingsCardContent({ title, value, modalOptions });
    });

    return (
      <SubPageWrapper
        tabLink="account"
        tabTitle="Account Settings"
        currentTab={currentTab}
      >
        <SubPageDescription>
          {
            'Manage your account here. Please indicate your mobile number to be contacted easily by a professional.'
          }
        </SubPageDescription>
        <SubPageContent>
          <Card className="account-settings-options">
            {accountOptionsJsx}
            <CardContent key="Password">
              <div className="account-settings-row">
                <div className="settings-title">
                  <h4>
                    Password
                    <span>******</span>
                  </h4>
                </div>
                <div className="settings-edit">
                  <Modal
                    size="mini"
                    trigger={
                      <button
                        className="ui button"
                        onClick={() => {
                          this.setState({ open: 'password' });
                        }}
                      >
                        Edit
                      </button>
                    }
                    open={this.state.open === 'password'}
                    onClose={() => this.setState({ open: '' })}
                  >
                    <Subsection>
                      <h4>Password</h4>
                      <Form
                        onSubmit={formData => {
                          this.updateUserPassword({
                            id: this.props.user.user.id,
                            data: {
                              password: formData.target.password.value,
                            },
                            url: 'set_password',
                            contentType: APPLICATION_JSON,
                          });
                          this.setState({ open: '' });
                        }}
                      >
                        <Form.Field
                          name="password"
                          type="password"
                          control="input"
                        />
                        <button className="ui button" type="submit">
                          Submit
                        </button>
                        <Message success header="Form Submitted" />
                      </Form>
                    </Subsection>
                  </Modal>
                </div>
              </div>
            </CardContent>
          </Card>
          <h3>Account Deletion:</h3>
          <Card>
            <CardContent>
              <div className="account-settings-row">
                <div className="settings-title">
                  <h4>
                    <span>Deactivate Account</span>
                  </h4>
                </div>
                <div className="settings-edit">
                  <Modal
                    size="mini"
                    trigger={
                      <button
                        className="ui button"
                        onClick={() => {
                          this.setState({ open: 'deactivate' });
                        }}
                      >
                        <Icon className="right angle" />
                      </button>
                    }
                    open={this.state.open === 'deactivate'}
                    onClose={() => this.setState({ open: '' })}
                  >
                    <Subsection>
                      <h1>Are you sure you want to deactivate your account?</h1>
                      <button
                        className="ui button"
                        onClick={() => {
                          this.props.dispatchAction({
                            type: USERS.DEACTIVATE.REQUESTED,
                            payload: {
                              id: this.props.user.LOAD_AUTH.data.userId,
                              url: 'deactivate',
                            },
                          });
                        }}
                      >
                        Confirm
                      </button>
                    </Subsection>
                  </Modal>
                </div>
              </div>
            </CardContent>
          </Card>
        </SubPageContent>
      </SubPageWrapper>
    );
  }
}
