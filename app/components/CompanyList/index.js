import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import CompanyCard from './CompanyCard';
import './company-list.css';
// import FormIO from '../../components/Form/ProfessionalsForm'
// import { FORMIO_URL } from '../../utils/api';

function CompanyList(props) {
  // const formio = {};
  const {
    selectable,
    onSelect,
    selected,
    goTo,
    companies,
    user,
    dispatchAction,
    showForm,
    // slug,
  } = props;
  return (
    <div id="company-list">
      {companies.results &&
        companies.results.map(item => (
          <CompanyCard
            style={{
              boxShadow:
                'lightgrey 0px 1px 2px 0px, rgb(255, 255, 255) 0px 0px 0px 1px',
            }}
            hideChatButton={user.user.merchant && user.user.merchant.length > 0}
            company={item}
            key={v4()}
            {...{
              selectable,
              onSelect,
              selected,
              goTo,
              user,
              dispatchAction,
              showForm,
            }}
          />
            
          // console.log('item.form_data[slug]',item.form_data[slug])
          // console.log('item.form_data[house-cleaning]',item.form_data.includes(slug))
          // console.log('item',item)
          
            
          // <div style={{ height: '50px', transition: 'height 2s', overflow: 'hidden' }}>
            
          // </div>
          // <FormIO
          //   url={`${FORMIO_URL}/filters/${slug}`}
          //   submission={{ data: item.form_data[slug] !== undefined ? item.form_data[slug] : {} }}
          //   ref={f => { formio[slug] = f }}
          // />
          // item.form_data.includes(slug) && 
            
          
          
          
        ))}
    </div>
  );
}

CompanyList.propTypes = {
  companies: PropTypes.object,
  selectable: PropTypes.bool,
  onSelect: PropTypes.func,
  selected: PropTypes.array,
  goTo: PropTypes.func,
  user: PropTypes.object,
  dispatchAction: PropTypes.func,
  showForm: PropTypes.func,
};

export default CompanyList;
