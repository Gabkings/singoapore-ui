/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import renderHTML from 'react-render-html';
import { Card, Form, Icon, Input, Modal, Grid, Dropdown } from 'semantic-ui-react';
import v4 from 'uuid/v4';
import PropTypes from 'prop-types';
import isImage from 'is-image';
import moment from 'moment';
import queryString from 'query-string';
import './conversation-window.css';
import ButtonWrapper from '../../components/Base/Button';
import Avatar from '../../components/Base/Avatar';
import Subsection from '../../components/Section/Subsection';
import PaperWrapper from '../../components/Base/Paper';
import TwoColumn from '../../components/Section/TwoColumn';
import FormResult from '../../components/Form/FormResult';
import { FORMIO_URL } from '../../utils/api';
import ListingLogoPlaceholder from '../../images/listing-logo-placeholder.jpg';
import AppointmentModal from './AppointmentModal';

export default class ConversationWindow extends React.Component {
  static propTypes = {
    messages: PropTypes.object,
    selectedChannel: PropTypes.object,
    onSubmitChat: PropTypes.func,
    onSubmitFile: PropTypes.func,
    onSubmitAppointment: PropTypes.func,
    user: PropTypes.object.isRequired,
    chatTarget: PropTypes.string,
    listing: PropTypes.object,
  };

  state = {
    attachment: null,
    preview: null,
    attachmentModalOpen: false,
    viewModalOpen: false,
    viewPreview: null,
    appointmentModalOpen: false,
  };
  renderAdminMessage = message => (
    <div>
      {message.customType === 'listing' && (
        <Subsection className="chat-listing">
          <a href={`/professionals/${JSON.parse(message.data).slug}`}>
            <PaperWrapper>
              <Subsection
                style={{
                  paddingBottom: '10px',
                  paddingTop: '20px',
                  textAlign: 'left',
                }}
              >
                <TwoColumn>
                  <Grid.Column width={4}>
                    <img
                      src={
                        JSON.parse(message.data).logo || ListingLogoPlaceholder
                      }
                      alt={JSON.parse(message.data).name}
                    />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <h3>{JSON.parse(message.data).name}</h3>
                    <p>{JSON.parse(message.data).description}</p>
                  </Grid.Column>
                </TwoColumn>
              </Subsection>
            </PaperWrapper>
            <div className="chat-related">This message is related to</div>
          </a>
        </Subsection>
      )}
      {message.customType === 'project' && (
        <div>
          {JSON.parse(message.data) &&
          JSON.parse(message.data).form_data && (
            <FormResult
              url={`${FORMIO_URL}/${
                JSON.parse(JSON.parse(message.data).form_data).category
              }`}
              submission={
                JSON.parse(JSON.parse(message.data).form_data).form_data
              }
            />
          )}
        </div>
      )}
    </div>
  );
  isSelf = ({ user, message }) =>
    (message.messageType === 'user' || message.messageType === 'file') &&
    user.user.username === message._sender.userId;
  renderMessages = ({ user, messages, selectedChannel }) => {
    let prevMsgUser = '';
    const isPreviousSender = message => {
      if (message.messageType === 'user') {
        if (prevMsgUser === message._sender.userId) {
          return true;
        }
        prevMsgUser = message._sender.userId;
      }
      return false;
    };
    return (
      <div>
        <Modal
          open={this.state.viewModalOpen}
          onClose={() => {
            this.setState({ viewModalOpen: false });
          }}
        >
          <Subsection>
            <img src={this.state.viewPreview} alt="" width="100%" />
          </Subsection>
        </Modal>
        {messages[selectedChannel.url] !== undefined &&
          messages[selectedChannel.url].map(message => (
            <div key={message.messageId}>
              {['user', 'file'].indexOf(message.messageType) !== -1 && (
                <div
                  className="chat-single-message"
                  style={{
                    flexDirection: this.isSelf({ user, message })
                      ? 'row-reverse'
                      : 'row',
                  }}
                >
                  <div className="chat-sender-avatar">
                    {isPreviousSender(message) ? (
                      <div className="dummy-avatar" />
                    ) : (
                      <Avatar
                        size={50}
                        src={`https://ui-avatars.com/api/?${queryString.stringify(
                          {
                            name: message._sender.nickname,
                          },
                        )}`}
                      />
                    )}
                  </div>
                  <Card className="chat-message-box" key={v4()}>
                    <Card.Header>
                      <span>{`${message._sender.nickname}: `}</span>
                      <span className="message-time">
                        {moment(message.createdAt).format('LT')}
                      </span>
                    </Card.Header>
                    <Card.Content>
                      {message.messageType === 'user' &&
                        renderHTML(message.message.replace(/\n/g, '<br />'))}
                      {message.messageType === 'file' && isImage(message.url) && (
                        <button
                          onClick={() => {
                            this.setState({
                              viewModalOpen: true,
                              viewPreview: message.url,
                            });
                          }}
                        >
                          <img
                            src={message.url}
                            alt={message.name}
                            width="100%"
                          />
                        </button>
                      )}
                      {message.messageType === 'file' && !isImage(message.url) && (
                        <a href={message.url}>
                          {message.name}
                        </a>
                      )}
                    </Card.Content>
                  </Card>
                </div>
              )}
              {message.messageType === 'admin' &&
                this.renderAdminMessage(message)}
            </div>
          ))}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  };
  render() {
    const {
      messages,
      selectedChannel,
      onSubmitChat,
      user,
      chatTarget,
      listing,
    } = this.props;
    return (
      <div className="chat-convo">
        <div className="chat-convo-title">
          <h3>{selectedChannel.url ? chatTarget : 'No Chat Selected'}</h3>
          {selectedChannel.url && selectedChannel.members && selectedChannel.members.filter(m => m.userId !== user.user.username).length > 0 && selectedChannel.members.filter(m => m.userId !== user.user.username)[0].connectionStatus === "online" && (
            <span className="online">
              <Icon className="tiny circle" /> Online
            </span>
          )}
        </div>
        <div className="chat-convo-messages">
          {this.renderMessages({ user, messages, selectedChannel })}
        </div>
        <Form onSubmit={onSubmitChat}>
          <div id="chat-input">
            <div className="image-upload">
              <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                <Icon className="attach" />
              </label>
              <input
                id="file-input"
                type="file"
                style={{ display: 'none' }}
                onChange={this.handleAttachChange}
              />
              <Modal open={this.state.attachmentModalOpen} size="mini">
                <Subsection>
                  {this.state.preview && isImage(this.state.preview) && (
                    <img src={this.state.preview} alt="" width="100%" />
                  )}
                  {this.state.preview && !isImage(this.state.preview) && (
                    <p>{this.state.attachment && this.state.attachment.name}</p>
                  )}
                  <button onClick={this.handleAttachmentCancel}>Cancel</button>
                  <button onClick={this.handleAttachmentSend}>Send</button>
                </Subsection>
              </Modal>
            </div>
            <div className="custom-divider" />
            <Input
              className="input-text"
              name="chatInput"
              placeholder="Send a message..."
            />
            <div className="custom-divider" />
            <AppointmentModal open={this.state.appointmentModalOpen} setOpen={appointmentModalOpen => {this.setState({ appointmentModalOpen })}} onSubmit={this.handleAppointmentSend}/>
            <div className="custom-divider" />
            {!(listing && listing.slug && selectedChannel && selectedChannel.name && selectedChannel.name.includes(listing.slug) && listing.phone) && (<Icon className="call" />)}
            {listing && listing.slug && selectedChannel && selectedChannel.name && selectedChannel.name.includes(listing.slug) && listing.phone && (
              <Dropdown icon='call' className='link item'>
                <Dropdown.Menu>
                  {listing.phone.split(',').map(phone => (
                    <Dropdown.Item><a href={`tel:${phone}`}>Call {phone}</a></Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <div className="custom-divider" />
            <ButtonWrapper
              design="filled"
              className="submit-button"
              type="submit"
              disabled={!selectedChannel.url}
            >
              Send
            </ButtonWrapper>
          </div>
        </Form>
      </div>
    );
  }
  handleAppointmentSend = ({ appointmentDate, place }) => {
    this.props.onSubmitAppointment({ appointmentDate, place });
    this.setState({ appointmentModalOpen: false });
  };
  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    this.messagesEnd.scrollTo({ x: 0, y: 1, behavior: "smooth" });
  }

  handleAttachChange = e => {
    const attachment = e.target.files[0];
    if (e.target.files.length > 0 && e.target.files[0]) {
      this.setState({
        attachment,
        attachmentModalOpen: true,
        preview: URL.createObjectURL(attachment),
      });
    }
  };
  handleAttachmentCancel = () => {
    this.setState({
      attachment: null,
      attachmentModalOpen: false,
      preview: null,
    });
  };
  handleAttachmentSend = () => {
    const { attachment } = this.state;
    this.props.onSubmitFile({
      file: attachment,
      name: attachment.name,
      type: attachment.type,
      size: attachment.size,
      data: null,
      customType: null,
    });
    this.setState({
      attachment: null,
      attachmentModalOpen: false,
      preview: null,
    });
  };
}
