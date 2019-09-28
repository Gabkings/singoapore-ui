/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import TemplatePage from '../Common/PageWrapper';
import Section from '../../components/Section/Section';
import Subsection from '../../components/Section/Subsection';
import TwoColumn from '../../components/Section/TwoColumn';
import CompanyList from '../../components/CompanyList';
import GetMatchedPaper from '../../components/GetMatchedPaper/GetMatchedPaper';
import SubscribePaper from '../../components/SubscribePaper/SubscribePaper';
import OneColumn from '../../components/Section/OneColumn';

import { LISTINGS, USERS } from '../../actions/restApi';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import directoryReducer from '../../reducers/directory';
import saga from '../../sagas';
import { DAEMON } from '../../utils/constants';
import { listings as defaultListings } from './content';
import './styles.css';
import CustomPagination from '../../components/CustomPagination';
import SearchProfessionalModal from '../../components/SearchBar/SearchProfessionalModal';
import Loader from '../Common/Loader';

export const DIRECTORY_VIEW = 'directory';

const mapDispatchToProps = dispatch => ({
  dispatchAction: ({ type, payload }) => {
    dispatch({ type, payload, view: DIRECTORY_VIEW });
  },
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  [DIRECTORY_VIEW]: state.get(DIRECTORY_VIEW).toJS(),
  user: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: DIRECTORY_VIEW,
  reducer: directoryReducer,
});
const withSaga = injectSaga({
  key: LISTINGS.MODEL,
  saga: saga(LISTINGS),
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class DirectoryPage extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    [DIRECTORY_VIEW]: PropTypes.object,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func,
    user: PropTypes.object,
  };
  state = {
    openSearchModal: false,
  };
  render() {
    let listings = this.props[DIRECTORY_VIEW][LISTINGS.MODEL].LIST;
    if (listings === undefined) {
      listings = defaultListings;
    }
    const query = queryString.parse(this.props.location.search);
    const pageNumber =
      query.offset && query.limit ? query.offset / query.limit + 1 : 1;
    const totalPages = listings.count
      ? Math.ceil(listings.count / (query.limit || 10))
      : 1;
    return (
      <TemplatePage {...this.props}>
        <div id="directory">
          <Section className="title">
            <Subsection>
              <h1>
                List of {listings && listings.count} Professionals in Singapore
              </h1>
              <SearchProfessionalModal
                open={this.state.openSearchModal}
                setOpen={open => {
                  this.setState({ openSearchModal: open });
                }}
                goTo={this.props.goTo}
              />
            </Subsection>
          </Section>
          <Section>
            <Subsection className="directory-content">
              <TwoColumn>
                <Grid.Column width={10}>
                  {listings && listings.requesting && <Loader/>}
                  {listings &&
                    !listings.requesting && (
                    <Subsection style={{ width: '95%' }}>
                      <CompanyList
                        companies={listings}
                        dispatchAction={this.props.dispatchAction}
                        user={this.props.user}
                        goTo={this.props.goTo}
                      />
                      <Subsection>
                        <CustomPagination
                          onPageChange={(e, data) => {
                            this.goToPage(data.activePage);
                          }}
                          activePage={pageNumber}
                          totalPages={totalPages}
                        />
                      </Subsection>
                    </Subsection>
                  )}
                </Grid.Column>
                <Grid.Column width={6}>
                  <Subsection style={{ width: '95%' }}>
                    <OneColumn>
                      <GetMatchedPaper />
                    </OneColumn>
                    <OneColumn>
                      <SubscribePaper
                        onSubscribe={this.onSubscribe}
                        onNameChange={this.onChange}
                        onEmailChange={this.onChange}
                      />
                    </OneColumn>
                  </Subsection>
                </Grid.Column>
              </TwoColumn>
            </Subsection>
          </Section>
        </div>
      </TemplatePage>
    );
  }

  componentDidMount() {
    const query = {
      ...queryString.parse(this.props.location.search),
      exclude_inactive: 'true',
      ranked: true,
    };
    this.props.dispatchAction({
      type: LISTINGS.LIST.REQUESTED,
      payload: { query },
    });
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.search !== this.props.location.search) {
      const query = {
        ...queryString.parse(this.props.location.search),
        exclude_inactive: 'true',
        ranked: true,
      };
      this.props.dispatchAction({
        type: LISTINGS.LIST.REQUESTED,
        payload: { query },
      });
    }
  }

  goToPage(pageNumber) {
    const limit = 10;
    const offset = Math.max((pageNumber - 1) * 10, 0);
    const query = queryString.stringify({
      ...queryString.parse(this.props.location.search),
      limit,
      offset: offset === 0 ? '' : offset,
    });
    const target = `${this.props.location.pathname}?${query}`;
    this.props.goTo({ path: target });
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(DirectoryPage);
