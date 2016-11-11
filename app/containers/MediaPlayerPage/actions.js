import {
  TOGGLE_RECORDING,
  SET_MEDIA_DATA,
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
