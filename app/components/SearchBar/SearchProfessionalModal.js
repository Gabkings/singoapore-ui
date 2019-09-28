import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';

export default class SearchProfessionalModal extends React.PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
  };
  state = {
    professionalsSearchInput: '',
  };
  render() {
    const { open, setOpen } = this.props;
    return (
      <Modal
        dimmer="inverted"
        trigger={
          <button
            onClick={() => {
              setOpen(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            <p className="gray underline">Search for a specific professional</p>
          </button>
        }
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            this.onSubmitSearchProfessional();
          }}
        >
          <div className="ui fluid category search">
            <div className="ui icon input fluid">
              <input
                id="professionals-search-input"
                type="text"
                placeholder="Search professionals..."
                value={this.state.professionalsSearchInput}
                onChange={e => {
                  this.setState({
                    professionalsSearchInput: e.target.value,
                  });
                }}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
              <button
                className="search icon"
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                <i className="search icon" />
              </button>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
  onSubmitSearchProfessional = () => {
    this.props.goTo({
      path: `/directory?search=${this.state.professionalsSearchInput}`,
    });
    this.props.setOpen(false);
    this.setState({ professionalsSearchInput: '' });
  };
}
