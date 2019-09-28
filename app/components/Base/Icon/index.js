import React from 'react';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';
import { FaSignInAlt, FaUser, FaEllipsisH } from 'react-icons/fa';
// import { IoIosConstruct } from 'react-icons/io';
// import { TiTree } from 'react-icons/ti';
// import BugReportIcon from '@material-ui/core/SvgIcon/SvgIcon';
import SearchIcon from '@material-ui/icons/Search';
import { Icon } from 'semantic-ui-react';

function getIcon(name, props) {
  switch (name) {
    case 'home':
      return <HomeIcon {...props} />;
    case 'login':
      return <FaSignInAlt {...props} />;
    case 'user':
      return <FaUser {...props} />;
    case 'search':
      return <SearchIcon {...props} />;
    case 'dots-h':
      return <FaEllipsisH {...props} />;
    default:
      return <Icon name={name} {...props} />;
  }
}

function IconWrapper(props) {
  return getIcon(props.name, props);
}

IconWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default IconWrapper;
