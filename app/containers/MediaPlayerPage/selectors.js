import { createSelector } from 'reselect';

const selectMediaPlayer = (state) => state.get('mediaPlayer');

const selectIsRecording = createSelector(
  selectMediaPlayer,
  (mediaPlayer) => mediaPlayer.get('isRecording'),
);

export {
  selectMediaPlayer,
  selectIsRecording,
};
