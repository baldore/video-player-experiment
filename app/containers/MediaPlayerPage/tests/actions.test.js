import expect from 'expect';

import {
  TOGGLE_RECORDING,
} from '../constants';

import {
  toggleRecording,
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
});
