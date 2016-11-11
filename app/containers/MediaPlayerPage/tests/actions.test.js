import expect from 'expect';

import {
  TOGGLE_RECORDING,
  SET_MEDIA_DATA,
} from '../constants';

import {
  toggleRecording,
  setMediaData,
} from '../actions';

describe('Media Player Actions', () => {
  describe('toggleRecording', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: TOGGLE_RECORDING,
      };
      expect(toggleRecording()).toEqual(expectedResult);
    });
  });

  describe('setMediaData', () => {
    it('should return the correct type', () => {
      const mediaData = { foo: 'bar' };
      const expectedResult = {
        type: SET_MEDIA_DATA,
        media: mediaData,
      };
      expect(setMediaData(mediaData)).toEqual(expectedResult);
    });
  });
});
