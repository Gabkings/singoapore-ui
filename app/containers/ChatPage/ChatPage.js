/* eslint-disable no-underscore-dangle,camelcase,prettier/prettier */
import React from 'react';
import { Grid, Icon, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MediaQuery from 'react-responsive';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import Section from '../../components/Section/Section';
import TemplatePage from '../Common/PageWrapper';
import { USERS, PROJECTS, LISTINGS } from '../../actions/restApi';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import chatReducer, { CHAT_VIEW } from '../../reducers/chat';
import userReducer from '../../reducers/user';
import userSaga from '../../sagas/user';
import chatSaga from '../../sagas/chat';
import formioSaga from '../../sagas/formio';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import Card from '../../components/Base/Card/Card';
import Subsection from '../../components/Section/Subsection';
import ChatPageChannels from './ChatPageChannels';
import ConversationWindow from './ConversationWindow';
import ConversationProfile from './ConversationProfile';

import './chat-page.css';

import { stubState } from './content';
import {
  CHANNELS,
  CHAT_USER,
  HANDLER,
  MESSAGES, UNREAD_COUNT,
} from '../../actions/chatApi';
import { FORMIO_FORM } from '../../actions/formioApi';
import ChatChannelsPoll from './ChatOnlinePoll';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: CHAT_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [CHAT_VIEW]: state.get(CHAT_VIEW).toJS(),
  user: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withChatReducer = injectReducer({
  key: CHAT_VIEW,
  reducer: chatReducer,
});

const withUserReducer = injectReducer({
  key: USERS.MODEL,
  reducer: userReducer,
});
const withUserSaga = injectSaga({
  key: USERS.MODEL,
  saga: userSaga,
  mode: DAEMON,
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
const withChatSaga = injectSaga({
  key: CHAT_VIEW,
  saga: chatSaga,
  mode: DAEMON,
});
const withFormioSaga = injectSaga({
  key: FORMIO_FORM.MODEL,
  saga: formioSaga,
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class ChatPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    [CHAT_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func,
  };
  constructor() {
    super();
    this.state = stubState;
    this.state.channelFilter = '';
  }

  render() {
    const { selectedChannel, channelFilter } = this.state;
    const { user } = this.props;
    const unfilteredChannels =
      this.props[CHAT_VIEW][CHANNELS.MODEL].LIST.channels !== undefined
        ? this.props[CHAT_VIEW][CHANNELS.MODEL].LIST.channels
        : stubState.channels;
    const { listings_slug } = this.props[CHAT_VIEW][PROJECTS.MODEL].GET;
    const query = queryString.parse(this.props.location.search);
    const slug = query.listing;
    // console.log('unfilteredChannels',unfilteredChannels)
    // console.log('listings_slug',listings_slug)
    // console.log('query',query)
    // console.log('slug',slug)
    
    let channels = listings_slug
      ? unfilteredChannels.filter(
        c => listings_slug.indexOf(c.name.split(' ')[0]) >= 0,
      )
      : unfilteredChannels;
    channels = slug ? channels.filter(c => c.name.includes(slug)) : channels;
    const messages =
      this.props[CHAT_VIEW][MESSAGES.MODEL].LIST !== undefined
        ? this.props[CHAT_VIEW][MESSAGES.MODEL].LIST
        : stubState.messages;
    const listing = this.props[CHAT_VIEW][LISTINGS.MODEL].GET;
    return (
      <TemplatePage {...this.props}>
        <MediaQuery query="(max-width: 991px)">
          {isNotComputer => (
            <Section>
              <Subsection style={{ padding: 0 }}>
                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
                  <Icon className="conversation" />
                  Messages
                </h2>
                {this.props[CHAT_VIEW][PROJECTS.MODEL].GET && this.props[CHAT_VIEW][PROJECTS.MODEL].GET.title && <h3>Project: {this.props[CHAT_VIEW][PROJECTS.MODEL].GET.title}</h3>}
              </Subsection>
              <Subsection>
                <Card className="chat-main">
                  <Grid celled="internally">
                    <Grid.Row className="chat-body">
                      <Grid.Column width={isNotComputer ? 16 : 4}>
                        <ChatPageChannels
                          channels={channels}
                          channelFilter={channelFilter}
                          user={user}
                          messages={messages}
                          selectedChannel={selectedChannel}
                          setSelectedChannel={this.setSelectedChannel}
                          getChannelInfo={this.getChannelInfo}
                          setChannelFilter={this.setChannelFilter}
                          goTo={this.props.goTo}
                        />
                      </Grid.Column>
                      {isNotComputer ? (
                        <Modal
                          open={!!this.state.selectedChannel.url}
                          onClose={() => {
                            this.setState({ selectedChannel: { url: null } });
                          }}
                          closeIcon
                        >
                          <Grid.Column style={{ height: '90vh' }} width={16}>
                            <ConversationWindow
                              user={user}
                              listing={listing}
                              selectedChannel={selectedChannel}
                              messages={messages}
                              onSubmitChat={this.onSubmitChat}
                              onSubmitFile={this.onSubmitFile}
                              onSubmitAppointment={this.onSubmitAppointment}
                              chatTarget={
                                this.getChannelInfo(
                                  selectedChannel,
                                  user.user.username,
                                ).other
                              }
                            />
                          </Grid.Column>
                        </Modal>
                      ) : (
                        <Grid.Column width={8}>
                          <ConversationWindow
                            user={user}
                            listing={listing}
                            selectedChannel={selectedChannel}
                            messages={messages}
                            onSubmitChat={this.onSubmitChat}
                            onSubmitFile={this.onSubmitFile}
                            onSubmitAppointment={this.onSubmitAppointment}
                            chatTarget={
                              this.getChannelInfo(
                                selectedChannel,
                                user.user.username,
                              ).other
                            }
                          />
                        </Grid.Column>
                      )}
                      <Grid.Column
                        className="convo-profile-container"
                        only="computer"
                        width={4}
                      >
                        {listing && listing.slug && this.state.selectedChannel && this.state.selectedChannel.name && this.state.selectedChannel.name.includes(listing.slug) && (
                          <ConversationProfile
                            {...this.props}
                            listing={listing}
                            selectedChannel={selectedChannel}
                            dispatchAction={this.props.dispatchAction}
                            handleHire={this.handleHire}
                            showHireButton={queryString.parse(this.props.location.search).project !== undefined}
                          />
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card>
              </Subsection>
              {this.props[CHAT_VIEW][CHAT_USER.MODEL].CONNECT.chatUser && <ChatChannelsPoll dispatchAction={this.props.dispatchAction}/>}
            </Section>
          )}
        </MediaQuery>
      </TemplatePage>
    );
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    if (query.project !== undefined) {
      this.props.dispatchAction({
        type: PROJECTS.POST.REQUESTED,
        payload: {
          id: query.project,
          url: 'create_chat',
        },
      });
      this.props.dispatchAction({
        type: PROJECTS.GET.REQUESTED,
        payload: {
          id: query.project,
        },
      });
    }
    if (query.listing !== undefined) {
      if (this.props.user && this.props.user.user && this.props.user.user.username) {
        this.props.dispatchAction({
          type: LISTINGS.POST.REQUESTED,
          payload: {
            id: query.listing,
            data: {
              user_email: this.props.user.user.username,
            },
            url: 'create_chat',
          },
        });
      }
      this.props.dispatchAction({
        type: LISTINGS.GET.REQUESTED,
        payload: {
          id: query.listing,
        },
      });
    }

    // eslint-disable-next-line react/no-did-mount-set-state
    // this.setState({ query });
  }
  // eslint-disable-next-line no-unused-vars
  componentWillUpdate(nextProps, nextState, ss) {
    const query = queryString.parse(nextProps.location.search);
    const prevQuery = queryString.parse(this.props.location.search);

    if (nextProps.user.user.username && query.listing !== undefined && prevQuery.listing !== query.listing && nextProps.user.LOAD_AUTH.data.consumerId > 0) {
      this.props.dispatchAction({
        type: LISTINGS.POST.REQUESTED,
        payload: {
          id: query.listing,
          data: {
            user_email: nextProps.user.user.username,
          },
          url: 'create_chat',
        },
      });
      this.props.dispatchAction({
        type: LISTINGS.GET.REQUESTED,
        payload: {
          id: query.listing,
        },
      });
    }
    if (nextProps.user.user.username &&
      nextProps[CHAT_VIEW][CHAT_USER.MODEL].CONNECT.chatUser === undefined &&
      nextProps[CHAT_VIEW][CHAT_USER.MODEL].CONNECT.requested === false) {
      this.props.dispatchAction({
        type: CHAT_USER.CONNECT.REQUESTED,
        payload: {
          userId: nextProps.user.user.username,
          accessToken: nextProps.user.user.send_bird_access_token,
        },
      });
    }
    if (
      nextProps[CHAT_VIEW][CHAT_USER.MODEL].CONNECT.chatUser !==
      this.props[CHAT_VIEW][CHAT_USER.MODEL].CONNECT.chatUser
    ) {
      this.props.dispatchAction({
        type: CHANNELS.LIST.REQUESTED,
        payload: {},
      });
      this.props.dispatchAction({
        type: UNREAD_COUNT.CHANNEL.REQUESTED,
      });
      this.props.dispatchAction({
        type: UNREAD_COUNT.MESSAGE.REQUESTED,
      });
      this.props.dispatchAction({
        type: HANDLER.REGISTER.REQUESTED,
        payload: {
          handler: (channel, message) => {
            this.props.dispatchAction({
              type: MESSAGES.RECEIVE.REQUESTED,
              payload: { channel, message },
            });
            this.props.dispatchAction({
              type: UNREAD_COUNT.CHANNEL.REQUESTED,
            });
            this.props.dispatchAction({
              type: UNREAD_COUNT.MESSAGE.REQUESTED,
            });
          },
          handlerType: 'onMessageReceived',
        },
      });
      this.props.dispatchAction({
        type: HANDLER.REGISTER.REQUESTED,
        payload: {
          // eslint-disable-next-line no-unused-vars
          handler: (groupChannel, inviter, invitees) => {
            this.props.dispatchAction({
              type: CHANNELS.LIST.REQUESTED,
              payload: {},
            });
          },
          handlerType: 'onUserReceivedInvitation',
        },
      });
    }
    if (nextProps[CHAT_VIEW][CHANNELS.MODEL].LIST.channels !==
      this.props[CHAT_VIEW][CHANNELS.MODEL].LIST.channels) {
      if (query.listing !== undefined) {
        const channel = nextProps[CHAT_VIEW][CHANNELS.MODEL].LIST.channels.filter(c => c.name.includes(query.listing));
        if (channel[0] !== undefined) {
          // eslint-disable-next-line react/no-will-update-set-state
          this.setState({selectedChannel: channel[0]});
        }
      }
    }
    if (
      nextState.selectedChannel !== this.state.selectedChannel &&
      nextState.selectedChannel.url !== null
    ) {
      this.props.dispatchAction({
        type: MESSAGES.LIST.REQUESTED,
        payload: { channel: nextState.selectedChannel },
      });
      this.props.dispatchAction({
        type: LISTINGS.GET.REQUESTED,
        payload: {
          id: nextState.selectedChannel.name.split(' ')[0],
        },
      });
    }
    if (
      this.props[CHAT_VIEW][PROJECTS.MODEL].POST.success_data === undefined &&
      nextProps[CHAT_VIEW][PROJECTS.MODEL].POST.success_data !== undefined
    ) {
      this.props.dispatchAction({
        type: CHAT_USER.CONNECT.REQUESTED,
        payload: {
          userId: nextProps.user.user.username,
          accessToken: nextProps.user.user.send_bird_access_token,
        },
      });
    }
  }
  getChannelInfo = (channel, userId) => {
    let other = '';
    if (channel && channel.members && channel.members.length === 2) {
      other =
        channel.members[0].userId === userId
          ? channel.members[1].nickname
          : channel.members[0].nickname;
    }
    return {
      other,
    };
  };
  setSelectedChannel = channel => {
    this.setState({ selectedChannel: channel });
    this.props.dispatchAction({
      type: CHANNELS.MARK_READ.REQUESTED,
      payload: {
        channel,
      },
    })
    // markChannelAsRead({ channel });
    // this.props.dispatchAction({
    //   type: LISTINGS.LIST.REQUESTED,
    //   payload: {
    //     query: {
    //       id: JSON.parse(channel.data).listings[0],
    //       exclude_inactive: 'true',
    //     },
    //   },
    // });
  };
  sendMessage = message => {
    this.props.dispatchAction({
      type: MESSAGES.SEND.REQUESTED,
      payload: {
        channel: this.state.selectedChannel,
        messageType: 'user',
        messageParams: {
          message,
          data: null,
          customType: null,
        },
      },
    });

  };
  sendChatEmail = (message) => {
    const { user } = this.props;
    const receiver = this.state.selectedChannel.members.filter(
      member => member.userId !== user.user.username,
    )[0];
    const sender = this.state.selectedChannel.members.filter(
      member => member.userId === user.user.username,
    )[0];
    this.props.dispatchAction({
      type: USERS.POST.REQUESTED,
      payload: {
        url: 'send_chat_email',
        // id: user.user.id,
        data: {
          receiver_email: receiver.userId,
          sender_email: sender.userId,
          receiver_name: receiver.nickname,
          sender_name: sender.nickname,
          message,
        },
      },
    });
  }
  onSubmitChat = event => {
    if (this.state.selectedChannel.url === null) {
      // alert('No Active Channel');
      return;
    }
    const message = event.target.chatInput.value;
    // eslint-disable-next-line no-param-reassign
    event.target.chatInput.value = '';
    this.sendMessage(message);
    this.sendChatEmail(message);
  };
  onSubmitFile = ({ file, name, type, size, data, customType }) => {
    if (this.state.selectedChannel.url === null) {
      // alert('No Active Channel');
      return;
    }
    this.props.dispatchAction({
      type: MESSAGES.SEND.REQUESTED,
      payload: {
        channel: this.state.selectedChannel,
        messageType: 'file',
        messageParams: {
          file,
          name,
          type,
          size,
          data,
          customType,
        },
      },
    });
    const message = `File: ${name}`
    this.sendChatEmail(message);
  };
  onSubmitAppointment = ({ appointmentDate, place }) => {
    if (this.state.selectedChannel.url === null) {
      // alert('No Active Channel');
      return;
    }
    const message = `Appointment Requested: ${appointmentDate.toString()}
    Place: ${place}
    `;
    this.sendMessage(message);
    this.sendChatEmail(message);
  };
  setChannelFilter = e => {
    if (e && e.target && typeof e.target.value === 'string') {
      this.setState({
        channelFilter: e.target.value,
      });
    }
  };
  handleHire = listingId => {
    this.props.dispatchAction({
      type: PROJECTS.PATCH.REQUESTED,
      payload: {
        id: JSON.parse(this.state.selectedChannel.data).projects[0],
        data: {
          hired: listingId,
          status: 'Hired',
        },
      },
    });
  };
}

export default compose(
  // Put `withReducer` before `withConnect`
  withUserReducer,
  withChatReducer,
  withUserSaga,
  withListingSaga,
  withProjectSaga,
  withChatSaga,
  withFormioSaga,
  withConnect,
)(ChatPage);
// export default ChatPage;
