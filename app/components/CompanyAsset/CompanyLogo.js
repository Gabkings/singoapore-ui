import React from 'react';
import { Image } from 'semantic-ui-react';
import './styles.css';
import { getS3Image } from '../../utils/images';

function CompanyLogo(props) {
  return (
    <Image
      id="company-logo"
      src={getS3Image('/images/SGHomeNeeds-Logo.png')}
      {...props}
    />
  );
}

export default CompanyLogo;
