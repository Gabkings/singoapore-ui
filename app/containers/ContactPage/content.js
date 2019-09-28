import React from 'react';
import PinIcon from '../../images/pin-icon.png';
import CallIcon from '../../images/call-icon.png';
import ClockIcon from '../../images/clock-icon.png';

export const cardInfo = [
  {
    img: PinIcon,
    title: 'Address',
    info: (
      <p>
        51 Goldhill Plaza #08-02 <br />Singapore 308900
      </p>
    ),
  },
  {
    img: CallIcon,
    title: 'Contact Info',
    info: (
      <p>
        +65 31591485<br />support@sghomeneeds.com
      </p>
    ),
  },
  {
    img: ClockIcon,
    title: 'Opening Hours',
    info: (
      <p>
        Monday to Friday <br />830 AM to 5PM
      </p>
    ),
  },
];
