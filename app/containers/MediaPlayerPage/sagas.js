import { fork, take, cancel, call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { getDataFromFile } from 'utils/native';

import { LOCATION_CHANGE } from 'react-router-redux';
import { PROCESS_FILE } from './constants';

import {
  setRawFile,
  setSourceUrl,
} from './actions';

/**
 * Takes the raw file and process it adding more useful information.
 * @param {Action} action      a SET_FILE_DATA action.
 * @param {File}   action.file Raw file coming from an input.
 */
export function* processFileSaga({ file }) {
  yield put(setRawFile(file));

  const { sourceUrl } = yield call(getDataFromFile, file); // TODO: Add error handling for file.
  yield put(setSourceUrl(sourceUrl));
}

/**
 * Watcher for processFile.
 */
export function* processFileWatcher() {
  yield fork(takeLatest, PROCESS_FILE, processFileSaga);
}

/**
 * Root saga that manages watcher lifecycle.
 */
export function* rootSaga() {
  const task = yield fork(processFileWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(task);
}

export default [
  rootSaga,
];
