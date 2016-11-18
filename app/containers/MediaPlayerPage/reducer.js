import { fromJS } from 'immutable';

import {
  SET_RAW_FILE,
} from './constants';

const initialState = fromJS({

});

export default function mediaPlayerReducer(state = initialState, action) {
  switch (action.type) {

    // case SET_FILE_DATA:
    //   return state.set('fileData', action.fileData);

    case SET_RAW_FILE:
      return state.set('rawFile', action.file);

    default:
      return initialState;
  }
}
