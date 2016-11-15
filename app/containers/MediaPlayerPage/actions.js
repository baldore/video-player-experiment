import {
  TOGGLE_RECORDING,
  SET_MEDIA_DATA,
  SET_RAW_FILE,
  SET_FILE_DATA,
} from './constants';

/**
 * Toggles the recording of new fragments.
 */
export const toggleRecording = () => ({
  type: TOGGLE_RECORDING,
});

/**
 * Changes the current media data.
 */
export const setMediaData = (media) => ({
  type: SET_MEDIA_DATA,
  media,
});

/**
 * Stores the raw file as it comes from the input.
 */
export const setRawFile = (file) => ({
  type: SET_RAW_FILE,
  file,
});

/**
 * Saves the processed file data.
 */
export const setFileData = (fileData) => ({
  type: SET_FILE_DATA,
  fileData,
});
