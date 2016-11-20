import React, { PropTypes } from 'react';

export default class Media extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let mediaElement = null;
    const { type, src } = this.props;

    if (!type || !src) {
      return null;
    }

    if (type.startsWith('audio')) {
      mediaElement = (
        <audio controls>
          <source src={src} type={type} />
        </audio>
      );
    }

    if (type.startsWith('video')) {
      mediaElement = (
        <video controls>
          <source src={src} type={type} />
        </video>
      );
    }

    return (
      mediaElement
    );
  }
}

Media.propTypes = {
  type: PropTypes.string,
  src: PropTypes.string,
};
