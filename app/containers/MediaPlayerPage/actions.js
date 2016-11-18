import {
  SET_RAW_FILE,
} from './constants';

export const setRawFile = (file) => ({
  type: SET_RAW_FILE,
  file,
});
