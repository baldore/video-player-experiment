import expect from 'expect';
import { fromJS } from 'immutable';

import mediaPlayerReducer from '../reducer';
import {
} from '../actions';

describe('mediaPlayerReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({

    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(mediaPlayerReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should store a new raw file');
  it('should store the src url');
});
