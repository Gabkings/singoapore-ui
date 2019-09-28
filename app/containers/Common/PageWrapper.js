/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import MediaQuery from 'react-responsive';
import connect from 'react-redux/es/connect/connect';
import { DAEMON } from '../../utils/constants';
import NavBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import './styles.css';
import LoadingSpinner from './LoadingSpinner';
import { CONSUMERS, SEO, USERS, FEATURE_SWITCHES } from '../../actions/restApi';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import ReducerFactory from '../../reducers/ReducerFactory';
import userReducer from '../../reducers/user';
import seoReducer, { SEO_VIEW } from '../../reducers/seo';
import userSaga from '../../sagas/user';
import saga from '../../sagas';
import chatReducer, { CHAT_VIEW } from '../../reducers/chat';
import chatSaga from '../../sagas/chat';
import {
  CHANNELS,
  CHAT_USER,
  HANDLER,
  MESSAGES,
  UNREAD_COUNT,
} from '../../actions/chatApi';

const mapDispatchToProps = dispatch => ({
  goTo: payload => {
    dispatch(push(payload.path));
  },
  dispatchAction: ({ type, payload, view }) => {
    dispatch({ type, payload, view });
  },
});

const mapStateToProps = state => ({
  user: state.get(USERS.MODEL).toJS(),
  [SEO_VIEW]: state.get(SEO_VIEW).toJS(),
  [CHAT_VIEW]: state.get(CHAT_VIEW).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withUserSaga = injectSaga({
  key: USERS.MODEL,
  saga: userSaga,
  mode: DAEMON,
});

const withSeoSaga = injectSaga({
  key: SEO.MODEL,
  saga: saga(SEO),
  mode: DAEMON,
});

const withConsumerSaga = injectSaga({
  key: CONSUMERS.MODEL,
  saga: saga(CONSUMERS),
  mode: DAEMON,
});

const withChatSaga = injectSaga({
  key: CHAT_VIEW,
  saga: chatSaga,
  mode: DAEMON,
});

const withUserReducer = injectReducer({
  key: USERS.MODEL,
  reducer: userReducer,
});
const withSeoReducer = injectReducer({
  key: SEO_VIEW,
  reducer: seoReducer,
});

const withChatReducer = injectReducer({
  key: CHAT_VIEW,
  reducer: chatReducer,
});


const withFeatureSwitchSaga = injectSaga({
  key: FEATURE_SWITCHES.MODEL,
  saga: saga(FEATURE_SWITCHES),
  mode: DAEMON,
});
const { reducer: featureSwitchReducer } = ReducerFactory(FEATURE_SWITCHES.MODEL, [FEATURE_SWITCHES.MODEL]);
const withFeatureSwitchReducer = injectReducer({
  key: FEATURE_SWITCHES.MODEL,
  reducer: featureSwitchReducer,
});

let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

/* eslint-disable react/prefer-stateless-function */
class TemplatePage extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    dispatchAction: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object,
    goTo: PropTypes.func,
    user: PropTypes.object,
  };
  state = {
    showMenu: false
    
  };
  render() {
    return (
      <MediaQuery query="(max-width: 768px)">
        {isPhone => (
          <LoadingSpinner>
            <NavBar
              showMenu={isPhone ? this.state.showMenu : true}
              showToggle={isPhone}
              onToggle={this.onToggle}
              {...this.props}
            />
            {this.props[SEO_VIEW][SEO.MODEL].LIST.results &&
              this.props[SEO_VIEW][SEO.MODEL].LIST.results.length > 0 &&
              this.props[SEO_VIEW][SEO.MODEL].LIST.results[0].output_tags && 
                          (
                <Helmet>
                  <title>{ this.props[SEO_VIEW][SEO.MODEL].LIST.results[0].title}</title>
                  {this.props[SEO_VIEW][SEO.MODEL].LIST.results[0].output_tags}
                </Helmet>
              )}
            {this.props.children}
            <Footer {...this.props} />
          </LoadingSpinner>
        )}
      </MediaQuery>
    );
  }
  onToggle = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  handleVisibilityChange = () => {
    if (!document[hidden]) {
      if (this) {
        this.forceUpdate()
      }
    }
  };


  forceVisibilityTrue = () => {
    this.handleVisibilityChange(true);
  };

  forceVisibilityFalse = () => {
    this.handleVisibilityChange(false);
  };

  
  componentDidMount() {
      document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
    document.addEventListener("focus", this.forceVisibilityTrue, false);
    document.addEventListener("blur", this.forceVisibilityFalse, false);

    window.addEventListener("focus", this.forceVisibilityTrue, false);
    window.addEventListener("blur", this.forceVisibilityFalse, false);

    this.props.dispatchAction({
      type: SEO.LIST.REQUESTED,
      payload: {
        query: {
          url: this.props.location.pathname,
        },
      },
      view: SEO_VIEW,
    });
    this.props.dispatchAction({
      type: FEATURE_SWITCHES.LIST.REQUESTED,
      payload: {},
      view: FEATURE_SWITCHES.MODEL,
    });
    const { data } = this.props.user.LOAD_AUTH;
    if (
      data &&
      data.consumerId &&
      data.consumerId !== -1 &&
      data.consumerId !== 0
    ) {
      this.props.dispatchAction({
        type: CONSUMERS.GET.REQUESTED,
        payload: {
          id: data.consumerId,
        },
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.user.LOAD_AUTH.data.consumerId !==
      prevProps.user.LOAD_AUTH.data.consumerId &&
      this.props.user.LOAD_AUTH.data.consumerId !== -1 &&
      this.props.user.LOAD_AUTH.data.consumerId !== 0
    ) {
      this.props.dispatchAction({
        type: CONSUMERS.GET.REQUESTED,
        payload: {
          id: this.props.user.LOAD_AUTH.data.consumerId,
        },
      });
    }
    if (
      this.props[SEO_VIEW][SEO.MODEL].LIST.count !== -1 &&
      this.props[SEO_VIEW][SEO.MODEL].LIST.count !==
      prevProps[SEO_VIEW][SEO.MODEL].LIST.count
    ) {
      if (
        this.props[SEO_VIEW][SEO.MODEL].LIST.count >= 1 &&
        this.props[SEO_VIEW][SEO.MODEL].LIST.results[0] &&
        prevProps[SEO_VIEW][SEO.MODEL].LIST.results[0] === undefined
      ) {
        const seoData = this.props[SEO_VIEW][SEO.MODEL].LIST.results[0];
        const hasRedirect =
          [undefined, null, ''].indexOf(seoData.redirect_url) === -1;
        if (hasRedirect) {
          let redirectUrl = seoData.redirect_url;
          const isMatch = redirectUrl.match(/\$[0-9]+/g);
          if (isMatch !== null && isMatch.length > 0) {
            const regex = new RegExp(seoData.url, 'g');
            const exec = regex.exec(this.props.location.pathname);
            const replacementString = exec && exec[1];
            if (replacementString) {
              redirectUrl = redirectUrl.replace(/\$[0-9]+/g, replacementString);
            }
          }
          this.props.goTo({ path: redirectUrl });
        } else {
     //   document.title=seoData.title;
        }
      }
    }
  }
  // eslint-disable-next-line no-unused-vars
  componentWillUpdate(nextProps, nextState, ss) {
    if (
      nextProps.user.user.username &&
      nextProps[CHAT_VIEW][CHAT_USER.MODEL].CONNECT.chatUser === undefined &&
      nextProps[CHAT_VIEW][CHAT_USER.MODEL].CONNECT.requested === false
    ) {
      this.props.dispatchAction({
        type: CHAT_USER.CONNECT.REQUESTED,
        payload: {
          userId: nextProps.user.user.username,
          accessToken: nextProps.user.user.send_bird_access_token,
        },
        view: CHAT_VIEW,
      });
    }
    if (
      nextProps[CHAT_VIEW][CHAT_USER.MODEL].CONNECT.chatUser !==
      this.props[CHAT_VIEW][CHAT_USER.MODEL].CONNECT.chatUser
    ) {
      this.props.dispatchAction({
        type: CHANNELS.LIST.REQUESTED,
        payload: {},
        view: CHAT_VIEW,
      });
      this.props.dispatchAction({
        type: UNREAD_COUNT.CHANNEL.REQUESTED,
        view: CHAT_VIEW,
      });
      this.props.dispatchAction({
        type: UNREAD_COUNT.MESSAGE.REQUESTED,
        view: CHAT_VIEW,
      });
      this.props.dispatchAction({
        type: HANDLER.REGISTER.REQUESTED,
        payload: {
          handler: (channel, message) => {
            this.props.dispatchAction({
              type: MESSAGES.RECEIVE.REQUESTED,
              payload: { channel, message },
              view: CHAT_VIEW,
            });
            this.props.dispatchAction({
              type: UNREAD_COUNT.CHANNEL.REQUESTED,
              view: CHAT_VIEW,
            });
            this.props.dispatchAction({
              type: UNREAD_COUNT.MESSAGE.REQUESTED,
              view: CHAT_VIEW,
            });
          },
          handlerType: 'onMessageReceived',
        },
        view: CHAT_VIEW,
      });
      this.props.dispatchAction({
        type: HANDLER.REGISTER.REQUESTED,
        payload: {
          // eslint-disable-next-line no-unused-vars
          handler: (groupChannel, inviter, invitees) => {
            this.props.dispatchAction({
              type: CHANNELS.LIST.REQUESTED,
              payload: {},
              view: CHAT_VIEW,
            });
          },
          handlerType: 'onUserReceivedInvitation',
        },
      });
      this.props.dispatchAction({
        type: HANDLER.REGISTER.REQUESTED,
        payload: {
          // eslint-disable-next-line no-unused-vars
          handler: (channel, user) => {
            this.props.dispatchAction({
              type: CHANNELS.CHANGE.REQUESTED,
              payload: { channel, user },
              view: CHAT_VIEW,
            });
          },
          handlerType: 'onUserJoined',
        },
      });
      this.props.dispatchAction({
        type: HANDLER.REGISTER.REQUESTED,
        payload: {
          // eslint-disable-next-line no-unused-vars
          handler: (channel, metaData) => {
            this.props.dispatchAction({
              type: CHANNELS.CHANGE.REQUESTED,
              payload: { channel, metaData },
              view: CHAT_VIEW,
            });
          },
          handlerType: 'onMetaDataUpdated',
        },
      });
    }
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withUserReducer,
  withSeoReducer,
  withChatReducer,
  withFeatureSwitchReducer,
  withUserSaga,
  withConsumerSaga,
  withSeoSaga,
  withChatSaga,
  withFeatureSwitchSaga,
  withConnect,
)(TemplatePage);
