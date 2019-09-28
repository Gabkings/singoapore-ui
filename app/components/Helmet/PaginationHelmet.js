/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';

function PaginationHelmet(props) {
  function getPageLink(pageNumber) {
    const limit = props.pageLimit;
    const offset = Math.max((pageNumber - 1) * props.pageLimit, 0);
    const target = `${props.location.pathname}?${queryString.stringify({
      ...queryString.parse(props.location.search),
      limit,
      offset: offset === 0 ? '' : offset,
    })}`;
    return target;
  }
  return (
    <Helmet>
      {props.pageNumber > 1 &&
      props.pageNumber <= props.totalPages && (
        <link rel="canonical" href={getPageLink(props.pageNumber)} />
      )}
      {props.pageNumber > 1 &&
        props.pageNumber <= props.totalPages && (
        <link rel="prev" href={getPageLink(props.pageNumber - 1)} />
      )}
      {props.pageNumber >= 1 &&
        props.pageNumber < props.totalPages && (
        <link rel="next" href={getPageLink(props.pageNumber + 1)} />
      )}
    </Helmet>
  );
}
PaginationHelmet.propTypes = {
  location: PropTypes.object.isRequired,
  pageLimit: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PaginationHelmet;
