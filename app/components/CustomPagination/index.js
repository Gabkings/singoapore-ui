import React from 'react';
import { Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './pagination-styles.css';

/* eslint-disable react/prefer-stateless-function */
export default class CustomPagination extends React.PureComponent {
  static propTypes = {
    activePage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func,
  };

  render() {
    const prevItem = <i className="icon angle double left fitted" />;
    const nextItem = <i className="icon angle double right fitted" />;
    const totalPages = Math.ceil(this.props.totalPages);
    return (
      <Pagination
        className="custom-pagination"
        firstItem={null}
        lastItem={null}
        prevItem={{ content: prevItem }}
        nextItem={{ content: nextItem }}
        {...this.props}
        totalPages={totalPages}
      />
    );
  }
}
