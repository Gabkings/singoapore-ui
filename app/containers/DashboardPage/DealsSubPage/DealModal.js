import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import ButtonWrapper from '../../../components/Base/Button';
import Subsection from '../../../components/Section/Subsection';
import { DEALS } from '../../../actions/restApi';
import DealForm from './DealForm';
import { DASHBOARD_VIEW } from '../../../reducers/dashboard';

export default class DealModal extends React.PureComponent {
  static propTypes = {
    dispatchAction: PropTypes.func.isRequired,
    deal: PropTypes.object.isRequired,
    listings: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    // [DASHBOARD_VIEW]: PropTypes.object,
  };
  render() {
    const { deal, open, listings } = this.props;
    return (
      <Modal
        trigger={
          <ButtonWrapper
            design="outline"
            onClick={() => {
              this.props.setOpen(deal.id);
            }}
          >
            Edit
          </ButtonWrapper>
        }
        size="mini"
        dimmer="inverted"
        open={open === deal.id}
        onClose={() => {
          this.props.setOpen(false);
        }}
        closeIcon
      >
        <Subsection>
          <h3>Edit Deal</h3>
          <DealForm
            formProps={{
              onSubmit: e => {
                e.preventDefault();
                const {
                  date,
                  project_type: projectType,
                  invoice_amount_dollars: invoiceAmountDollars,
                  percent_commission: percentCommission,
                  customer_email: customerEmail,
                  listing,
                  remarks,
                } = e.target;
                this.props.dispatchAction({
                  type: DEALS.PATCH.REQUESTED,
                  payload: {
                    id: deal.id,
                    data: {
                      date: date.value,
                      project_type: projectType.value,
                      invoice_amount_dollars: invoiceAmountDollars.value,
                      percent_commission: percentCommission.value,
                      customer_email: customerEmail.value,
                      listing: listing.value,
                      remarks: remarks.value,
                    },
                  },
                });
              },
            }}
            listings={listings}
            deal={deal}
          />
          {this.props[DASHBOARD_VIEW][DEALS.MODEL].GET.error && (
            <p style={{ color: 'red' }}>
              {this.props[DASHBOARD_VIEW][DEALS.MODEL].GET.error.toString()}
            </p>
          )}
        </Subsection>
      </Modal>
    );
  }
}
