import { createSelector } from 'reselect';

export const selectMediaPlayer = (state) => state.get('mediaPlayer');

export const selectIsRecording = createSelector(
  selectMediaPlayer,
  (mediaPlayer) => Boolean(mediaPlayer.get('firstRecordingTime')),
);

export const selectSourceUrl = createSelector(
  selectMediaPlayer,
  (mediaPlayer) => mediaPlayer.get('sourceUrl')
);

export const selectFileType = createSelector(
  selectMediaPlayer,
  (mediaPlayer) => {
    const rawFile = mediaPlayer.get('rawFile');
    return rawFile && rawFile.type;
  }
);
