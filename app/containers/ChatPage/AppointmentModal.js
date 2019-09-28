import React from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-datetime-picker';
import { Icon, Modal } from 'semantic-ui-react';
import Subsection from '../../components/Section/Subsection';
import ButtonWrapper from '../../components/Base/Button';

export default class AppointmentModal extends React.PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    appointmentDate: new Date(),
    place: '',
  };
  render() {
    const { open, setOpen, onSubmit } = this.props;
    return (
      <Modal
        trigger={
          <button
            type="button"
            id="appointment-button"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Icon className="circle plus" />
          </button>
        }
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        size="mini"
      >
        <Subsection>
          <h3>Would you like an appointment?</h3>
          <div style={{ padding: '10px' }}>
            <DateTimePicker
              onChange={appointmentDate => {
                this.setState({ appointmentDate });
              }}
              value={this.state.appointmentDate}
            />
            {/* <LocationSearchInput /> */}
          </div>
          <div style={{ padding: '10px', paddingBottom: '20px' }}>
            <div className="ui labeled input">
              <div className="ui label">Place:</div>
              <input
                type="text"
                placeholder="Place"
                value={this.state.place}
                onChange={e => {
                  this.setState({ place: e.target.value });
                }}
              />
            </div>
          </div>
          <ButtonWrapper
            design="outline"
            onClick={() => {
              this.setState({ appointmentDate: new Date() });
              setOpen(false);
            }}
          >
            Cancel
          </ButtonWrapper>
          <ButtonWrapper
            design="filled"
            onClick={() => {
              const { appointmentDate, place } = this.state;
              onSubmit({ appointmentDate, place });
              this.setState({ appointmentDate: new Date(), place: '' });
              setOpen(false);
            }}
          >
            Request
          </ButtonWrapper>
        </Subsection>
      </Modal>
    );
  }
}
