/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid/v4';
// import { DEALS, LISTINGS } from '../../../actions/restApi';
// import { DASHBOARD_VIEW } from '../../../reducers/dashboard';
import ButtonWrapper from '../../../components/Base/Button';

export default class DealForm extends React.PureComponent {
  static propTypes = {
    formProps: PropTypes.object.isRequired,
    listings: PropTypes.object.isRequired,
    deal: PropTypes.object.isRequired,
  };
  render() {
    const { formProps, listings, deal } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
        {...formProps}
        className={`ui form ${formProps.className || ''}`}
      >
        <div className="field">
          <label>Listing</label>
          <select name="listing" className="ui fluid dropdown">
            {listings.results.map(listing => (
              <option value={listing.id}>{listing.name}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Date</label>
          <input
            type="date"
            name="date"
            defaultValue={deal.date || new Date()}
          />
        </div>
        <div className="field">
          <label>Customer Email</label>
          <input
            type="email"
            name="customer_email"
            defaultValue={deal.customer_email || ''}
          />
        </div>
        <div className="field">
          <label>Project Type</label>
          <select
            name="project_type"
            className="ui fluid dropdown"
            defaultValue={deal && deal.project_type}
          >
            {listings.results
              .filter(listing => deal.listing === listing.id)[0]
              .categories_name.map(category => (
                <option key={v4()} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>
        <div className="field">
          <label>Invoice Amount ($)</label>
          <input
            type="number"
            name="invoice_amount_dollars"
            defaultValue={deal.invoice_amount_dollars || 0}
          />
        </div>
        <div className="field">
          <label>Commission (%)</label>
          <input
            type="number"
            name="percent_commission"
            defaultValue={deal.percent_commission || 0}
          />
        </div>
        <div className="field">
          <label>Promo Code</label>
          <textarea name="remarks" defaultValue={deal.remarks || ''} />
        </div>
        <ButtonWrapper design="filled" type="submit">
          SUBMIT
        </ButtonWrapper>
      </form>
    );
  }
}
