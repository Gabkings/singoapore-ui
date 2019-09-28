import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function HomePageImageBannerSection(props) {
  return (
    <div>
      <div className="banner_position">
        <img src={props.imageSource} className="mybanner_setting" alt="" />
      </div>

      <div className="banner_child">{props.children}</div>
    </div>
  );
}

HomePageImageBannerSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  imageSource: PropTypes.node,
};

export default HomePageImageBannerSection;
