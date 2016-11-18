import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectMediaPlayer,
  selectIsRecording,
  selectSourceUrl,
  // selectFileType,
} from '../selectors';

describe('selectMediaPlayer selector', () => {
  it('should select the media player state', () => {
    const innerState = fromJS({ foo: 'bar' });
    const mediaPlayerState = fromJS({
      mediaPlayer: innerState,
    });
    expect(selectMediaPlayer(mediaPlayerState)).toEqual(innerState);
  });
});

describe('selectIsRecording selector', () => {
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

describe('selectSourceUrl selector', () => {
  it('should return the source url if exist', () => {
    const mediaPlayerState = fromJS({
      mediaPlayer: {
        sourceUrl: 'foo',
      },
    });
    expect(selectSourceUrl(mediaPlayerState)).toEqual('foo');
  });

  it('should return null if there is no source url', () => {
    const mediaPlayerState = fromJS({
      mediaPlayer: {},
    });
    expect(selectSourceUrl(mediaPlayerState)).toEqual(null);
  });
});


describe('selectFileType selector', () => {
  it('should return the type of the current file');
  it('should return null if there is no file');
});
