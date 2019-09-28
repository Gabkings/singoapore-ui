import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import Button from '../Base/Button';
import './styles.css';
export default class Subscribe extends React.PureComponent {
  static propTypes = {
    headerText: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    buttonText: PropTypes.string,
    buttonType: PropTypes.string,
    onSubmit: PropTypes.func,
    // onNameChange: PropTypes.func,
    // onEmailChange: PropTypes.func,
  };
  state = {
    name: '',
    email: '',
    showThankYou: false,
  };
  render() {
    const { headerText, buttonType, onSubmit, buttonText } = this.props;
    const { name, email, showThankYou } = this.state;
    return (
      <div
        style={{
          textAlign: 'left',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {headerText}
        <Input
          className="footerStyle"
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
          value={name}
          placeholder="Name"
          style={{ width: '100%' }}
        />
        <br />
        <br />
        <Input
          onChange={e => {
            this.setState({ email: e.target.value });
          }}
          placeholder="Email"
          value={email}
          className="footerStyle"
          style={{ width: '100%' }}
        />
        <br />
        <br />
        <Button
          design={buttonType}
          onClick={() => {
            onSubmit({ name, email });
            this.setState({ name: '', email: '', showThankYou: true });
          }}
          className="subscriber_footer_btn"
        >
          {[buttonText]}
        </Button>
        {showThankYou && <p>Thank you for subscribing!</p>}
      </div>
    );
  }
}
