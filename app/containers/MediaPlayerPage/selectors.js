import { createSelector } from 'reselect';

const selectMediaPlayer = (state) => state.get('mediaPlayer');

const selectIsRecording = createSelector(
  selectMediaPlayer,
  (mediaPlayer) => Boolean(mediaPlayer.get('firstRecordingTime')),
);

export {
  selectMediaPlayer,
  selectIsRecording,
};
