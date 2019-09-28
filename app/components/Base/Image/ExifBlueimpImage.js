/* eslint-disable react/no-find-dom-node,no-param-reassign,prettier/prettier */
import React from 'react';
import ReactDom from 'react-dom';
import loadImage from 'blueimp-load-image';
import PropTypes from 'prop-types';
import './styles.css';

// Reference: https://medium.com/@oscarfranco_14246/how-to-automatically-rotate-an-image-based-on-exif-data-on-react-a41a27feb57c

export default class ImageViewer extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
  };

  imageCanvas = {};

  componentDidMount() {
    loadImage(this.props.src, (img) => {
      img.className = 'fit_to_parent';
      img.alt = this.props.alt;
      const el = ReactDom.findDOMNode(this.imageCanvas);
      if (el) {
        el.appendChild(img);
      }
    }, {orientation: true});
  }

  render() {
    return (
      <div
        ref={(ref) => {this.imageCanvas = ref}}
      />
    );
  }
}
