/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import queryString from 'query-string';
import { Menu, Icon, Grid, Sidebar, Dropdown, Transition } from 'semantic-ui-react';
import CompanyLogo from '../CompanyAsset/CompanyLogo';
import { links, phoneNumber, dashboardLinks, merchantDashboardLinks } from './content';
import SearchBar from '../SearchBar';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import LinkWrapper from '../Base/Link';
import './styles.css';
import NavigationMenuItem from './NavigationMenuItem';
import ImageWrapper from '../Base/Image';
import { CHAT_VIEW } from '../../reducers/chat';
import { UNREAD_COUNT } from '../../actions/chatApi';


class NavigationBar extends React.Component {
  state = { visible: false, height: 0, first: 5, second: 4, three: 3, four: 4, open: false };

  handleHideClick = () =>
    this.setState({ visible: false }, () => {
      this.setState({ height: 0 });
    });
  handleShowClick = () => this.setState({ visible: true, height: 200 });
  handleSidebarHide = () =>
    this.setState({ visible: false }, () => {
      this.setState({ height: 0 });
    });
  renderLinks(device) {
    switch (device) {
      case 'tablet':
        return (
          <Grid.Column
            width={8}
            id="hoverable-item"
            style={{ textAlign: 'right', paddingTop: 10 }}
          >
            {links.map(item => (
              <NavigationMenuItem
                key={item.key}
                a={{
                  href: item.url,
                  text: item.text,
                  className: 'navigation-menu-item item',
                }}
              />
            ))}
          </Grid.Column>
        );
      default:
        return (
          <Grid.Column
            id="hoverable-item"
            className="second"
            width={this.state.second}
            style={{ marginTop: 10, textAlign: 'right', paddingTop: 10 }}
          >
            {links.map(item => (
              <NavigationMenuItem
                key={item.key}
                a={{
                  href: item.url,
                  text: item.text,
                  className: 'navigation-menu-item item',
                }}
              />
            ))}
          </Grid.Column>
        );
    }
  }
  renderDashboardLinks(device, userLinks) {
    switch (device) {
      case 'tablet':
        return (
          <Grid.Column
            width={8}
            id="hoverable-item"
            style={{ textAlign: 'right', paddingTop: 10 }}
          >
            {userLinks.map(item => (
              <NavigationMenuItem
                key={item.key}
                a={{
                  href: item.url,
                  text: item.text,
                  className: 'navigation-menu-item item',
                }}
              />
            ))}
            <NavigationMenuItem
              key={v4()}
              a={{
                href: '/dashboard/chat',
                text: 'Messages',
                className: 'navigation-menu-item item',
              }}
              icon={this.props[CHAT_VIEW][UNREAD_COUNT.MODEL].CHANNEL.count > 0 && <i className="circle icon" style={{color: 'green'}} />}
            />
          </Grid.Column>
        );
      default:
        return (
          <Grid.Column
            id="hoverable-item"
            className="second"
            width={this.state.second}
            style={{ marginTop: 10, textAlign: 'right', paddingTop: 10 }}
          >
            {userLinks.map(item => (
              <NavigationMenuItem
                key={item.key}
                a={{
                  href: item.url,
                  text: item.text,
                  className: 'navigation-menu-item item',
                }}
              />
            ))}
            <NavigationMenuItem
              key={v4()}
              a={{
                href: '/dashboard/chat',
                text: 'Messages',
                className: 'navigation-menu-item item',
              }}
              icon={this.props[CHAT_VIEW][UNREAD_COUNT.MODEL].CHANNEL.count > 0 && <i className="circle icon" style={{color: 'green'}} />}
            />
          </Grid.Column>
        );
    }
  }
  renderComapanyPart(device) {
    switch (device) {
      case 'mobile':
        return (
          <Grid.Column width={12} id="company-logo-flex">
            <div className="company-logo-wrapper">
              <LinkWrapper href="/">
                <CompanyLogo />
              </LinkWrapper>
            </div>
          </Grid.Column>
        );
      case 'tablet':
        return (
          <Grid.Column
            width={8}
            style={{ marginRight: '0', paddingRight: '0' }}
          >
            <div className="company-logo-wrapper" style={{ display: 'flex' }}>
              <LinkWrapper href="/">
                <CompanyLogo />
              </LinkWrapper>
              <div className="phone-number-wrapper">
                <h4>{phoneNumber}</h4>
              </div>
            </div>
          </Grid.Column>
        );
      default:
        // computer
        return (
          <Grid.Column
            width={this.state.first}
            className="first"
            style={{ paddingTop: 10 }}
          >
            <div className="company-logo-wrapper">
              <LinkWrapper href="/">
                <CompanyLogo />
              </LinkWrapper>
            </div>
            <div className="phone-number-wrapper">
              <h4>{phoneNumber}</h4>
            </div>
          </Grid.Column>
        );
    }
  }
  renderSearch(device) {
    const { history } = this.props;
    switch (device) {
      case 'mobile':
        return (
          <Grid.Column width={16} style={{ marginTop: 15 }}>
            <SearchBar
              history={history}
              fluid
              placeholder="Plumber, electricians, mover..."
              inputStyle={{
                borderRadius: '0px',
              }}
              size="small"
              buttonStyle={{}}
            />
          </Grid.Column>
        );
      case 'tablet':
        return (
          <Grid.Column width={8} style={{ paddingTop: 10 }}>
            <SearchBar
              history={history}
              width="210px"
              placeholder="Plumber, electricians, mover..."
              inputStyle={{
                borderRadius: '0px',
              }}
              size="small"
              buttonStyle={{}}
            />
          </Grid.Column>
        );
      default:
        return (
          <Grid.Column
            width={this.state.three}
            className="three"
            style={{ paddingTop: 10 }}
          >
            <SearchBar
              history={history}
              width="210px"
              placeholder="Plumber, electricians, mover..."
              inputStyle={{
                borderRadius: '0px',
              }}
              size="small"
              buttonStyle={{}}
            />
          </Grid.Column>
        );
    }
  }
  renderSidebar() {
    const { visible } = this.state;
    const { history, user, logout } = this.props;
    return (
      <Sidebar.Pushable as="div">
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          direction="top"
          visible={visible}
          width="thin"
        >
          {!(user && user.isLoggedIn) &&
            links.map(link => (
              <Menu.Item key={v4()}>
                <a href={link.url}>{link.text}</a>
              </Menu.Item>
            ))}
          {user &&
            user.isLoggedIn &&
            user.LOAD_AUTH.data.consumerId > 0 &&
            dashboardLinks.filter(link => link.text !== 'Messages' ).map(link => (
              <Menu.Item key={v4()}>
                <a href={link.url}>{link.text}</a>
              </Menu.Item>
            ))}
          {user &&
            user.isLoggedIn &&
            user.LOAD_AUTH.data.merchantId > 0 &&
            merchantDashboardLinks.filter(link => link.text !== 'Messages' ).map(link => (
              <Menu.Item key={v4()}>
                <a href={link.url}>{link.text}</a>
              </Menu.Item>
            ))}
          {user &&
          user.isLoggedIn &&
          user.user.enable_chat && (
            <Menu.Item key={v4()}>
              <a href="/dashboard/chat">Messages {this.props[CHAT_VIEW][UNREAD_COUNT.MODEL].CHANNEL.count > 0 && <i className="circle icon" style={{color: 'green'}} />}</a>
            </Menu.Item>
          )}

          {user &&
            user.isLoggedIn && (
            <Menu.Item>
              <div className="menu-wrapper">
                <div style={{ display: 'inline-block' }}>
                  {user.user.profile_image && (
                    <ImageWrapper
                      height="40px"
                      width="40px"
                      rounded
                      src={user.user.profile_image}
                    />
                  )}
                  {!user.user.profile_image && (
                    <ImageWrapper
                      height="40px"
                      width="40px"
                      rounded
                      src={`https://ui-avatars.com/api/?${queryString.stringify(
                        {
                          name: user.user.long_first_name,
                        },
                      )}`}
                    />
                  )}
                </div>
                <div
                  className="navbar-name"
                  style={{ display: 'inline-block' }}
                >
                  {user.user.long_first_name}
                </div>
              </div>
            </Menu.Item>
          )}
          {user &&
            user.isLoggedIn && (
            <Menu.Item>
              <div className="text-link">
                <LinkWrapper href="/dashboard">Dashboard</LinkWrapper>
              </div>
            </Menu.Item>
          )}
          {user &&
            user.isLoggedIn && (
            <Menu.Item>
              <button className="text-link" onClick={() => {logout()}}>Logout</button>
            </Menu.Item>
          )}
          {!(user && user.isLoggedIn) && (
            <Menu.Item>
              <LoginButton
                onClick={() => {
                  history.push('/login');
                }}
              />

              <RegisterButton
                onClick={() => {
                  history.push('/register');
                }}
              />
            </Menu.Item>
          )}
        </Sidebar>

        <Sidebar.Pusher>
          <div style={{ height: this.state.height }} />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
  renderUserLoggedIn() {
    const { logout, user } = this.props;
    return (
      <div>
        <Menu id="user-menu">
          <Menu.Menu position="right">
            <Dropdown
              style={{ height: '40px' }}
              trigger={
                <div className="menu-wrapper">
                  <div style={{ display: 'inline-block' }}>
                    <ImageWrapper
                      height="40px"
                      width="40px"
                      rounded
                      src={
                        user.user.profile_image
                          ? user.user.profile_image
                          : `https://ui-avatars.com/api/?${queryString.stringify(
                            {
                              name: user.user.long_first_name,
                            },
                          )}`
                      }
                    />
                  </div>
                  <div
                    className="navbar-name"
                    style={{ display: 'inline-block' }}
                  >
                    {user.user.long_first_name}
                  </div>
                </div>
              }
              onOpen={() => {this.setState({open: true})}}
              onClose={() => {this.setState({open: false})}}
            >
              <Transition visible={this.state.open} animation="drop">
                <Dropdown.Menu className="drop">
                  <a className="item" href="/dashboard">
                    <div className="text-link">Dashboard</div>
                  </a>
                  <button className="item text-link" onClick={() => {logout()}}>
                    Logout
                  </button>
                </Dropdown.Menu>
              </Transition>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }

  render() {
    const { history, user } = this.props;
    window.onresize = () => {
      if (window.innerWidth < 992) {
        this.setState({ first: 8, second: 8, three: 8, four: 8 });
      } else if (window.innerWidth > 992 && window.innerWidth < 1284) {
        this.setState({ first: 8, second: 8, three: 8, four: 8 });
      } else if (window.innerWidth > 1284) {
        this.setState({ first: 5, second: 4, three: 4, four: 3 });
      }
    };
    return (
      <div
        className="box-show"
        style={{
          /* position: 'fixed', */ width: '100%',
          zIndex: 200,
          background: 'white',
          padding: '10px 40px 12px 40px',
        }}
      >
        <Grid>
          <Grid.Row columns={4} only="computer">
            {this.renderComapanyPart('computer')}
            {!(user && user.isLoggedIn) && this.renderLinks('computer')}
            {user && user.isLoggedIn && this.renderDashboardLinks('computer', user.LOAD_AUTH.data.consumerId > 0 ? dashboardLinks.filter(link => link.text !== 'Messages' ) : merchantDashboardLinks.filter(link => link.text !== 'Messages' ))}
            {this.renderSearch('computer')}
            {user && user.isLoggedIn ? (
              <Grid.Column
                id="LR"
                className="four"
                width={this.state.four}
                style={{ paddingTop: 10 }}
              >
                {this.renderUserLoggedIn()}
              </Grid.Column>
            ) : (
              <Grid.Column
                id="LR"
                className="four"
                width={this.state.four}
                style={{ paddingTop: 10 }}
              >
                <LoginButton
                  onClick={() => {
                    history.push('/login');
                  }}
                />

                <RegisterButton
                  onClick={() => {
                    history.push('/register');
                  }}
                />
              </Grid.Column>
            )}
          </Grid.Row>

          {/* <Grid.Row columns={4} only="tablet"> */}
          {/* {this.renderComapanyPart('tablet')} */}
          {/* {!(user && user.isLoggedIn) && this.renderLinks('tablet')} */}
          {/* {user && user.isLoggedIn && this.renderDashboardLinks('tablet')} */}
          {/* {this.renderSearch('tablet')} */}
          {/* {user && user.isLoggedIn ? ( */}
          {/* <Grid.Column */}
          {/* width={8} */}
          {/* style={{ textAlign: 'right', paddingTop: 10 }} */}
          {/* > */}
          {/* {this.renderUserLoggedIn()} */}
          {/* </Grid.Column> */}
          {/* ) : ( */}
          {/* <Grid.Column */}
          {/* width={8} */}
          {/* style={{ textAlign: 'right', paddingTop: 10 }} */}
          {/* > */}
          {/* <LoginButton */}
          {/* onClick={() => { */}
          {/* history.push('/login'); */}
          {/* }} */}
          {/* /> */}

          {/* <RegisterButton */}
          {/* onClick={() => { */}
          {/* history.push('/register'); */}
          {/* }} */}
          {/* /> */}
          {/* </Grid.Column> */}
          {/* )} */}
          {/* </Grid.Row> */}
          <Grid.Row columns={3} only="mobile tablet">
            {this.renderComapanyPart('mobile')}
            <Grid.Column style={{ textAlign: 'right' }} width={4}>
              {/* <Button disabled={visible} onClick={this.handleShowClick}>
                Show sidebar
          </Button> */}
              <Icon
                link
                name="bars"
                onClick={this.handleShowClick}
                size="large"
              />
            </Grid.Column>
            {this.renderSearch('mobile')}
          </Grid.Row>
          {/* side Nav on Mobile View */}
        </Grid>
        {this.renderSidebar()}
      </div>
    );
  }
  componentDidMount() {
    if (window.innerWidth < 992) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ first: 8, second: 8, three: 8, four: 8 });
    } else if (window.innerWidth > 992 && window.innerWidth < 1284) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ first: 8, second: 8, three: 8, four: 8 });
    } else if (window.innerWidth > 1284) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ first: 5, second: 4, three: 4, four: 3 });
    }
  }
}

NavigationBar.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default NavigationBar;
