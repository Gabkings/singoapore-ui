import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
