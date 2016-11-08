import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import noop from 'lodash/noop';

import messages from './messages';
import { toggleRecording } from './actions';
import { selectIsRecording } from './selectors';

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
};

MediaPlayerPage.defaultProps = {
  onRecordingButtonClick: noop,
};

export const mapStateToProps = createStructuredSelector({
  isRecording: selectIsRecording,
});

export const actionsProps = {
  onRecordingButtonClick: toggleRecording,
};

export default connect(mapStateToProps, actionsProps)(MediaPlayerPage);
