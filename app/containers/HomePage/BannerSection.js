import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import PaperWrapper from '../../components/Base/Paper/index';
import SearchBar from '../../components/SearchBar/index';
// import Banner from '../../images/HomePage/banner.jpg';

import HomePageImageBannerSection from '../../components/Section/HomePageImageBannerSection';
import Subsection from '../../components/Section/Subsection';

import '../../components/ButtonGroup/styles.css';
import './styles.css';
import { getS3Image } from '../../utils/images';
import SearchProfessionalModal from '../../components/SearchBar/SearchProfessionalModal';

const Banner = getS3Image('/images/HomePage/banner.jpg');

/* eslint-disable react/prefer-stateless-function */
export default class BannerSection extends React.PureComponent {
  static propTypes = {
    isPhone: PropTypes.bool,
    history: PropTypes.object,
    goTo: PropTypes.func,
  };
  state = {
    openSearchModal: false,
  };
  render() {
    const { isPhone, history } = this.props;
    return (
      <HomePageImageBannerSection
        imageSource={Banner}
        style={{ marginBottom: isPhone ? '150px' : '100px' }}
      >
        <PaperWrapper id="banner-paper" className="mybanner_paper">
          <Subsection className="search_heading">
            <h1>Hire Home Improvement Pros</h1>
            <p className="gray font-size-18" style={{ marginBottom: '35px' }}>
              SGHomeNeeds is the trusted partner for your home
            </p>
            <div
              style={{ margin: '10px auto', width: '77%' }}
              className="searchbar"
            >
              <SearchBar
                placeholder="Plumber, electricians, mover..."
                fluid
                history={history}
                inputStyle={{ paddingLeft: '30px' }}
              />
            </div>
            <div id="search-bottom-link">
              <SearchProfessionalModal
                open={this.state.openSearchModal}
                setOpen={open => {
                  this.setState({ openSearchModal: open });
                }}
                goTo={this.props.goTo}
              />
              {/* <a className="gray underline" href="/#"> */}
              {/* Search for A Specific Professional */}
              {/* </a> */}
            </div>
          </Subsection>
        </PaperWrapper>
      </HomePageImageBannerSection>
    );
  }
}
