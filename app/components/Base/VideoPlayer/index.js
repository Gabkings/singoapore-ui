import React from 'react';
import PropTypes from 'prop-types';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; // import css

function VideoPlayer(props) {
  return (
    <Player
      playsInline
      poster={props.poster}
      src={props.videoSource}
      {...props}
    />
  );
}

VideoPlayer.propTypes = {
  poster: PropTypes.object,
  videoSource: PropTypes.node,
};

export default VideoPlayer;
