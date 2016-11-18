import expect from 'expect';
import { fromJS } from 'immutable';

import mediaPlayerReducer from '../reducer';
import {
  setRawFile,
  setSourceUrl,
} from '../actions';

describe('mediaPlayerReducer', () => {
  const state = fromJS({});

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(mediaPlayerReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should store a new raw file', () => {
    const file = 'my_file';
    const newState = state.set('rawFile', file);
    expect(mediaPlayerReducer(state, setRawFile(file))).toEqual(newState);
  });

  it('should store the source url', () => {
    const source = 'video/aabbcc';
    const newState = state.set('sourceUrl', source);
    expect(mediaPlayerReducer(state, setSourceUrl(source))).toEqual(newState);
  });
});
