import { fromJS } from 'immutable';

import {
  SET_RAW_FILE,
  SET_SOURCE_URL,
} from './constants';

const initialState = fromJS({

});

export default function mediaPlayerReducer(state = initialState, action) {
  switch (action.type) {

    case SET_RAW_FILE:
      return state.set('rawFile', action.file);

    case SET_SOURCE_URL:
      return state.set('sourceUrl', action.sourceUrl);

    default:
      return initialState;
  }
}
