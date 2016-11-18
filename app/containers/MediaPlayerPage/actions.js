import {
  SET_RAW_FILE,
  SET_SOURCE_URL,
} from './constants';

export const setRawFile = (file) => ({
  type: SET_RAW_FILE,
  file,
});

export const setSourceUrl = (sourceUrl) => ({
  type: SET_SOURCE_URL,
  sourceUrl,
});
