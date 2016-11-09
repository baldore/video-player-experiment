import React, { PropTypes } from 'react';

export default class Media extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let mediaElement = null;

    if (this.props.type === 'audio') {
      mediaElement = <audio />;
    }

    if (this.props.type === 'video') {
      mediaElement = <video />;
    }

    return (
      mediaElement
    );
  }
}

Media.propTypes = {
  type: PropTypes.string,
};
