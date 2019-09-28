/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import Subsection from '../../components/Section/Subsection';
import { REPORTS } from '../../actions/restApi';
import ButtonWrapper from '../../components/Base/Button';

/* eslint-disable react/prefer-stateless-function */
export default class ReportModal extends React.PureComponent {
  static propTypes = {
    listing: PropTypes.object,
    review: PropTypes.object,
    user: PropTypes.object,
    dispatchAction: PropTypes.func,
    triggerButtonChild: PropTypes.object,
  };
  state = {
    openModal: false,
    reporterName: '',
    reporterEmail: '',
  };
  render() {
    const { listing, review, user, triggerButtonChild } = this.props;
    return (
      <Modal
        trigger={
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.setState({ openModal: true });
            }}
          >
            {triggerButtonChild}
          </button>
        }
        open={this.state.openModal}
        onClose={() => {
          this.setState({ openModal: false });
        }}
      >
        <Subsection>
          <h4>
            {`Report ${(listing && 'listing') ||
              (review && 'review')} "${(listing && listing.name) ||
              (review && review.listing_name)}"`}
            {user &&
              user.user &&
              user.user.id &&
              ` by ${user.user.long_first_name} (${user.user.email})`}
          </h4>
          <form
            className="ui form"
            onSubmit={e => {
              e.preventDefault();
              this.props.dispatchAction({
                type: REPORTS.POST.REQUESTED,
                payload: {
                  data: {
                    listing: listing ? listing.id : undefined,
                    review: review ? review.id : undefined,
                    reporter: user.user.id,
                    notes: e.target.notes.value,
                    reporter_name: e.target.reporter_name.value,
                    reporter_email: e.target.reporter_email.value,
                  },
                },
              });
              e.target.notes.value = '';
              this.setState({ openModal: false });
            }}
          >
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                name="reporter_name"
                value={this.state.reporterName}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="reporter_email"
                value={this.state.reporterEmail}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label>Notes</label>
              <textarea name="notes" />
            </div>
            <ButtonWrapper design="filled" type="submit">
              Report
            </ButtonWrapper>
          </form>
        </Subsection>
      </Modal>
    );
  }
  handleChange = e => {
    if (e.target.name === 'reporter_name') {
      this.setState({
        reporterName: e.target.value,
      });
    }
    if (e.target.name === 'reporter_email') {
      this.setState({
        reporterEmail: e.target.value,
      });
    }
  };
}
