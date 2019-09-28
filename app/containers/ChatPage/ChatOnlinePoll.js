import React from 'react';
import PropTypes from 'prop-types';
import { CHANNELS } from '../../actions/chatApi';

export default class ChatChannelsPoll extends React.PureComponent {
  static propTypes = {
    dispatchAction: PropTypes.func,
  };
  render() {
    return <div />;
  }
  componentDidMount() {
    this.timer = setInterval(() => this.updateChannelMembers(), 10000);
  }
  componentWillUnmount() {
    this.timer = null;
  }

  updateChannelMembers() {
    this.props.dispatchAction({
      type: CHANNELS.LIST.REQUESTED,
    });
  }
}
