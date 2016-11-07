import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export class MediaPlayerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          <button>
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
};

export default connect()(MediaPlayerPage);
