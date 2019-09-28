/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import queryString from 'query-string';
import { Loader } from 'semantic-ui-react';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import injectReducer from '../../utils/injectReducer';
import searchBarReducer from '../../reducers/searchBar';
import injectSaga from '../../utils/injectSaga';
import { CATEGORIES } from '../../actions/restApi';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import './styles.css';


const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload, view }) => {
    dispatch({ type, payload, view });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  searchBar: state.get('searchBar').toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'searchBar',
  reducer: searchBarReducer,
});
const withSaga = injectSaga({
  key: CATEGORIES.MODEL,
  saga: saga(CATEGORIES),
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class SearchBar extends React.PureComponent {
  constructor() {
    super();
    this.view = v4();
  }
  static propTypes = {
    history: PropTypes.object,
    placeholder: PropTypes.string,
    width: PropTypes.string,
    fluid: PropTypes.bool,
    inputStyle: PropTypes.object,
    // buttonStyle: PropTypes.object,
    buttonContent: PropTypes.oneOf(['icon', 'text']),
    buttonText: PropTypes.string,
    size: PropTypes.string,
    dispatchAction: PropTypes.func,
    searchBar: PropTypes.object,
  };

  state = {
    value: '',
    mouseOver: false,
    showMenu: false,
  };

  render() {
    const {
      fluid,
      placeholder,
      inputStyle,
      width,
      // buttonStyle,
      buttonContent = 'icon',
      buttonText,
      searchBar,
      size = 'large',
    } = this.props;
    return (
      <div
        onFocus={() => {
          this.setState({ showMenu: true });
        }}
      >
        <form className="search-form" onSubmit={this.handleSubmit}>
          <div className={`ui ${size} action input ${fluid ? 'fluid' : ''}`}>
            <input
              className="search-input seach_input"
              type="text"
              placeholder={placeholder}
              value={this.state.value}
              onChange={this.handleChange}
              style={{ width, ...inputStyle }}
              onBlur={() => {
                this.setState({ showMenu: this.state.mouseOver });
              }}
              onFocus={() => {
                this.setState({ showMenu: true });
              }}
            />
            <button
              className="ui icon button seach_bar_btn"
              style={{ borderRadius: '0', zIndex: 999 }}
            >
              {buttonContent === 'icon' ? (
                <div>
                  <i className="search icon" style={{ color: 'white' }} />
                </div>
              ) : (
                buttonText
              )}
            </button>
          </div>
        </form>
        <div className="search-menu-wrapper">
          <div
            className="search-menu"
            style={{
              display: this.state.showMenu ? 'inherit' : 'none',
              position: this.state.showMenu ? 'absolute' : 'inherit',
              zIndex: 101,
            }}
            onMouseLeave={() => {
              this.setState({ mouseOver: false });
            }}
            onMouseEnter={() => {
              this.setState({ mouseOver: true });
            }}
          >
            <div className="ui vertical menu fluid">
              {searchBar[this.view] &&
                searchBar[this.view][CATEGORIES.MODEL] &&
                searchBar[this.view][CATEGORIES.MODEL].LIST &&
                searchBar[this.view][CATEGORIES.MODEL].LIST.results &&
                searchBar[this.view][CATEGORIES.MODEL].LIST.results.map(
                  item => (
                    <a
                      href={`/services/${item.slug}`}
                      className="item"
                      key={v4()}
                    >
                      {item.name}
                    </a>
                  ),
                )}
              {searchBar[this.view] &&
                searchBar[this.view][CATEGORIES.MODEL] &&
                searchBar[this.view][CATEGORIES.MODEL].LIST &&
                searchBar[this.view][CATEGORIES.MODEL].LIST.requesting && (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a className="item">
                  <Loader active size="mini" />
                </a>
              )}
              <a href="/services" className="item">
                Or View all services
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
      showMenu: event.target.value.length > 0,
    });
    this.updateSearch(event.target.value);
  };

  updateSearch = searchInput => {
    this.props.dispatchAction({
      type: CATEGORIES.LIST.REQUESTED,
      payload: {
        showSpinner: false,
        query: { search: searchInput },
      },
      view: this.view,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // this.search(this.state.value);
  };

  search = query => {
    const search = queryString.stringify({
      search: query,
    });
    const target = `/directory?${search}`;
    this.props.history.push(target);
  };
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(SearchBar);
