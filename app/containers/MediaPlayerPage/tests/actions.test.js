import expect from 'expect';

import {
  PROCESS_FILE,
  SET_RAW_FILE,
  SET_SOURCE_URL,
} from '../constants';

import {
  processFile,
  setRawFile,
  setSourceUrl,
} from '../actions';

describe('Media Player Actions', () => {
  describe('processFile', () => {
    it('should create an action to process a file', () => {
      const file = 'foo';
      expect(processFile(file)).toEqual({
        type: PROCESS_FILE,
        file,
      });
    });
  });

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
