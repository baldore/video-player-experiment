import {
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({

});

export default function mediaPlayerReducer(state = initialState, action) {
  switch (action.type) {

    // case SET_FILE_DATA:
    //   return state.set('fileData', action.fileData);

    default:
      return initialState;
  }
}
