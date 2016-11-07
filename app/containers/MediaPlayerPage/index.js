/*
 * MediaPlayerPage
 */

import React from 'react';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';

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
        </div>
      </article>
    );
  }
}

MediaPlayerPage.propTypes = {

};

export default MediaPlayerPage;
