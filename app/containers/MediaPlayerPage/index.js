import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import noop from 'lodash/noop';

import messages from './messages';
import {
  processFile,
} from './actions';

import {
  selectSourceUrl,
  selectFileType,
} from './selectors';

import Media from './Media';
import Button from 'components/Button';

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
          <Media {...this.props.media} />
          <Button onClick={this.props.onRecordingButtonClick}>
            <FormattedMessage
              {...(this.props.isRecording ? messages.recordButtonRecording : messages.recordButtonStart)}
            />
          </Button>
        </div>
      </article>
    );
  }
}

MediaPlayerPage.propTypes = {
  isRecording: PropTypes.bool,
  media: PropTypes.object,
  onRecordingButtonClick: PropTypes.func,
  onFileInputChange: PropTypes.func,
};

MediaPlayerPage.defaultProps = {
  onRecordingButtonClick: noop,
  onFileInputChange: noop,
};

export const mapStateToProps = createStructuredSelector({
  media: createStructuredSelector({
    src: selectSourceUrl,
    type: selectFileType,
  }),
});

export const actionsProps = {
  onFileInputChange(event) {
    return processFile(event.target.files[0]);
  },
};

export default connect(mapStateToProps, actionsProps)(MediaPlayerPage);
