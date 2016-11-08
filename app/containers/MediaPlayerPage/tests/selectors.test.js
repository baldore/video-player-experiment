import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectMediaPlayer,
  selectIsRecording,
} from '../selectors';

describe('selectMediaPlayer', () => {
  it('should select the media player state', () => {
    const innerState = fromJS({ foo: 'bar' });
    const mediaPlayerState = fromJS({
      mediaPlayer: innerState,
    });
    expect(selectMediaPlayer(mediaPlayerState)).toEqual(innerState);
  });
});

describe('selectIsRecording', () => {
  it('should select the isRecording flag', () => {
    const mediaPlayerState = fromJS({
      mediaPlayer: {
        isRecording: false,
      },
    });
    expect(selectIsRecording(mediaPlayerState)).toEqual(false);
  });
});
