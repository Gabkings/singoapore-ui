import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import PaperWrapper from '../Base/Paper';
import SearchBar from '../SearchBar';
// import { filters } from '../../containers/DirectoryPage/content';
import ButtonWrapper from '../Base/Button';

function FilterBar(props) {
  return (
    <Container>
      <PaperWrapper style={{ textAlign: 'center' }}>
        <Container style={{ paddingTop: '50px' }}>
          <SearchBar />
          {props.filters
            .slice(0, 3)
            .map(item => <ButtonWrapper>{item.name}</ButtonWrapper>)}
          {props.filters.length > 3 && (
            <ButtonWrapper>More Filters</ButtonWrapper>
          )}
        </Container>
      </PaperWrapper>
    </Container>
  );
}

FilterBar.propTypes = {
  filters: PropTypes.array,
};

export default FilterBar;
