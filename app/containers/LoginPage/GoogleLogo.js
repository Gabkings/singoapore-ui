import React from 'react';
import { Image } from 'semantic-ui-react';

export default class GoogleLogo extends React.PureComponent {
  render() {
    return (
      <Image
        alt="Google Logo"
        src="https://s3-ap-southeast-1.amazonaws.com/sghomeneeds-gallery/images/LoginPage/google_logo.svg"
        {...this.props}
      />
    );
  }
}
