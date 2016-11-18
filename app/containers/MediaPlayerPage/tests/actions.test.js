import expect from 'expect';

import {
  SET_RAW_FILE,
  SET_SOURCE_URL,
} from '../constants';

import {
  setRawFile,
  setSourceUrl,
} from '../actions';

describe('Media Player Actions', () => {
  describe('setRawFile', () => {
    it('should create an action to store the file', () => {
      const file = 'foo';
      expect(setRawFile(file)).toEqual({
        type: SET_RAW_FILE,
        file,
      });
    });
  });

  describe('setSourceUrl', () => {
    it('should create an action to store the source url', () => {
      const sourceUrl = 'video/aabbcc';
      expect(setSourceUrl(sourceUrl)).toEqual({
        type: SET_SOURCE_URL,
        sourceUrl,
      });
    });
  });
});
