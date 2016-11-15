import {
  TOGGLE_RECORDING,
  SET_FILE_DATA,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  isRecording: false,
  fileData: null,
});

export default function mediaPlayerReducer(state = initialState, action) {
  switch (action.type) {

    // TODO: Remove isRecording and TOGGLE_RECORDING action. It should be managed via firstRecordingTime.
    case TOGGLE_RECORDING:
      return state.set('isRecording', !state.get('isRecording'));

    case SET_FILE_DATA:
      return state.set('fileData', action.fileData);

    default:
      return initialState;
  }
}
