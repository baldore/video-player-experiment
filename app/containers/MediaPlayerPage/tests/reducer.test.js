import expect from 'expect';
import mediaPlayerReducer from '../reducer';
import {
  toggleRecording,
} from '../actions';
import { fromJS } from 'immutable';

describe('mediaPlayerReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      isRecording: false,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(mediaPlayerReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should toggle the isRecording flag', () => {
    const withRecordingFalse = state;
    const withRecordingTrue = fromJS({ isRecording: true });
    expect(mediaPlayerReducer(withRecordingFalse, toggleRecording())).toEqual(withRecordingTrue);
    expect(mediaPlayerReducer(withRecordingTrue, toggleRecording())).toEqual(withRecordingFalse);
  });
});
