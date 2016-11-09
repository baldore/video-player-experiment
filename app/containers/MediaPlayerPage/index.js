import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import noop from 'lodash/noop';

import messages from './messages';
import { toggleRecording } from './actions';
import { selectIsRecording } from './selectors';

export function getVideoSourceFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export class MediaPlayerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <article>
        <Helmet
          title="Media Player Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <h1>Hola mundo genial???</h1>
          <form>
            <input
              onChange={this.props.onFileInputChange}
              type="file"
              accept="audio/*,video/*"
            />
          </form>
          <video controls></video>
          <button onClick={this.props.onRecordingButtonClick}>
            <FormattedMessage
              {...(this.props.isRecording ? messages.recordButtonRecording : messages.recordButtonStart)}
            />
          </button>
        </div>
      </article>
    );
  }
}

MediaPlayerPage.propTypes = {
  isRecording: PropTypes.bool,
  onRecordingButtonClick: PropTypes.func,
  onFileInputChange: PropTypes.func,
};

MediaPlayerPage.defaultProps = {
  onRecordingButtonClick: noop,
  onFileInputChange(event) {
    getVideoSourceFromFile(event.target.files[0])
      .then((videoSource) => {
        console.info(videoSource.substring(0, 40));
      })
      .catch((err) => console.error(err));
  },
};

export const mapStateToProps = createStructuredSelector({
  isRecording: selectIsRecording,
});

export const actionsProps = {
  onRecordingButtonClick: toggleRecording,
};

export default connect(mapStateToProps, actionsProps)(MediaPlayerPage);
