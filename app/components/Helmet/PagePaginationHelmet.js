/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';

function PagePaginationHelmet(props) {
  function getPageLink(page) {
    const target = `${props.location.pathname}?${queryString.stringify({
      ...queryString.parse(props.location.search),
      page,
    })}`;
    return page === 1 ? props.location.pathname === '/services/exterior-painting' ? '/services/interior-painting' : props.location.pathname : target;
  }
  const cur = parseInt(props.pageNumber, 10);
  const prev = cur - 1;
  const next = cur + 1;
  return (
    <Helmet>
      {props.pageNumber >= 1 &&
      props.pageNumber <= props.totalPages && (
        <link rel="canonical" href={getPageLink(props.pageNumber)} />
      )}
      {props.pageNumber > 1 &&
        props.pageNumber <= props.totalPages && (
        <link rel="prev" href={getPageLink(prev)} />
      )}
      {props.pageNumber >= 1 &&
        props.pageNumber < props.totalPages && (
        <link rel="next" href={getPageLink(next)} />
      )}
    </Helmet>
  );
}
PagePaginationHelmet.propTypes = {
  location: PropTypes.object.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PagePaginationHelmet;
