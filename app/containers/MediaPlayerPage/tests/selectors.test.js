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
  it('should return false if firstRecordingTime is falsy', () => {
    const mediaPlayerState = fromJS({
      mediaPlayer: {
        firstRecordingTime: null,
      },
    });
    expect(selectIsRecording(mediaPlayerState)).toEqual(false);
  });

  it('should return true if firstRecordingTime is truthy', () => {
    const mediaPlayerState = fromJS({
      mediaPlayer: {
        firstRecordingTime: 10,
      },
    });
    expect(selectIsRecording(mediaPlayerState)).toEqual(true);
  });
});
