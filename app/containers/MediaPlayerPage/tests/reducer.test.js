import expect from 'expect';
import { fromJS } from 'immutable';

import mediaPlayerReducer from '../reducer';
import {
  toggleRecording,
  setFileData,
} from '../actions';

describe('mediaPlayerReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      isRecording: false,
      fileData: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(mediaPlayerReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should toggle the isRecording flag', () => {
    const withRecordingFalse = state;
    const withRecordingTrue = withRecordingFalse.set('isRecording', true);
    expect(mediaPlayerReducer(withRecordingFalse, toggleRecording())).toEqual(withRecordingTrue);
    expect(mediaPlayerReducer(withRecordingTrue, toggleRecording())).toEqual(withRecordingFalse);
  });

  it('should set a new file data object', () => {
    const fileData = { foo: 'bar' };
    const previousState = state;
    const newState = previousState.set('fileData', fileData);
    expect(mediaPlayerReducer(previousState, setFileData(fileData))).toEqual(newState);
  });
});
