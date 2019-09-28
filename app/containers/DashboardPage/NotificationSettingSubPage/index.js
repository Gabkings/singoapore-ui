import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import { Checkbox } from 'semantic-ui-react';
import Card from '../../../components/Base/Card/Card';
import CardContent from '../../../components/Base/Card/CardContent';
import {
  ConsumersEmailSettings,
  ConsumersTextSettings,
  ProfessionalsEmailSettings,
  ProfessionalsTextSettings,
} from './content';
import { USERS } from '../../../actions/restApi';
import SubPageWrapper from '../SubpageWrapper';
import SubPageDescription from '../SubpageWrapper/SubPageDescription';
import SubPageContent from '../SubpageWrapper/SubPageContent';
import './styles.css';

/* eslint-disable react/prefer-stateless-function */
export default class NotificationSettingSubPage extends React.PureComponent {
  static propTypes = {
    currentTab: PropTypes.string,
    dispatchAction: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };
  state = {};
  renderSettings(title, settingsList) {
    const settingsListJsx = settingsList.map(item => (
      <CardContent className="setting-box" key={v4()}>
        <div className="setting-text">
          <h5>{item.settingName}</h5>
          {item.settingDesc ? <p>{item.settingDesc}</p> : null}
        </div>
        <div className="setting-toggle">
          <Checkbox
            toggle
            checked={this.state[item.id]}
            onChange={(e, data) => {
              const newState = { ...this.state };
              newState[item.id] = data.checked;
              this.setState(newState);
              this.props.dispatchAction({
                type: USERS.PATCH.REQUESTED,
                payload: {
                  data: {
                    notification_settings: newState,
                  },
                  id: this.props.user.user.id,
                },
              });
            }}
          />
        </div>
      </CardContent>
    ));

    return (
      <div className="setting-group">
        <h4>{title}:</h4>
        <Card>{settingsListJsx}</Card>
      </div>
    );
  }

  render() {
    const { currentTab, user } = this.props;
    return (
      <SubPageWrapper
        currentTab={currentTab}
        tabTitle="Notification Settings"
        tabLink="notifications"
      >
        <SubPageDescription>
          {
            'Get notified on latest news, articles, tips and promotions! Receive notifications when you have new chat updates or project updates.'
          }
        </SubPageDescription>
        <SubPageContent>
          {user.LOAD_AUTH.data.consumerId > 0 &&
            this.renderSettings(
              'Get email notifications for:',
              ConsumersEmailSettings,
            )}
          {user.LOAD_AUTH.data.consumerId > 0 &&
            this.renderSettings(
              'Get mobile notifications for:',
              ConsumersTextSettings,
            )}
          {user.LOAD_AUTH.data.merchantId > 0 &&
            this.renderSettings(
              'Get email notifications for:',
              ProfessionalsEmailSettings,
            )}
          {user.LOAD_AUTH.data.merchantId > 0 &&
            this.renderSettings(
              'Get mobile notifications for:',
              ProfessionalsTextSettings,
            )}
        </SubPageContent>
      </SubPageWrapper>
    );
  }
  componentDidMount() {
    this.updateNotifications();
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { user } = this.props;
    if (
      user.user.notification_settings !==
      prevProps.user.user.notification_settings
    ) {
      this.updateNotifications();
    }
  }
  updateNotifications = () => {
    const { user } = this.props;
    if (user.user.notification_settings) {
      if (user.LOAD_AUTH.data.consumerId > 0) {
        ConsumersEmailSettings.forEach(item => {
          if (user.user.notification_settings[item.id] === undefined) {
            this.state[item.id] = item.defaultBool;
          } else {
            this.state[item.id] = user.user.notification_settings[item.id];
          }
        });
        ConsumersTextSettings.forEach(item => {
          if (user.user.notification_settings[item.id] === undefined) {
            this.state[item.id] = item.defaultBool;
          } else {
            this.state[item.id] = user.user.notification_settings[item.id];
          }
        });
        this.forceUpdate();
      } else if (user.LOAD_AUTH.data.merchantId > 0) {
        ProfessionalsEmailSettings.forEach(item => {
          if (user.user.notification_settings[item.id] === undefined) {
            this.state[item.id] = item.defaultBool;
          } else {
            this.state[item.id] = user.user.notification_settings[item.id];
          }
        });
        ProfessionalsTextSettings.forEach(item => {
          if (user.user.notification_settings[item.id] === undefined) {
            this.state[item.id] = item.defaultBool;
          } else {
            this.state[item.id] = user.user.notification_settings[item.id];
          }
        });
        this.forceUpdate();
      }
    }
  };
}
