import {
  TOGGLE_RECORDING,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  isRecording: false,
});

export default function mediaPlayerReducer(state = initialState, action) {
  switch (action.type) {

    case TOGGLE_RECORDING:
      return state.set('isRecording', !state.get('isRecording'));

    default:
      return initialState;
  }
}