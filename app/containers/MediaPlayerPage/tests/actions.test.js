import expect from 'expect';

import {
  SET_RAW_FILE,
} from '../constants';

import {
  setRawFile,
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
});
