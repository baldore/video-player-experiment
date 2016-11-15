/**
 * Gets the repositories of the user from Github
 */

// import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { fork, take } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_RAW_FILE } from './constants';

// import { selectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* processFile() {
  // const username = yield select(selectUsername()); // Select username from store
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  // try {
  //   // Call our request helper (see 'utils/request')
  //   const repos = yield call(request, requestURL);
  //   yield put(reposLoaded(repos, username));
  // } catch (err) {
  //   yield put(repoLoadingError(err));
  // }
}

export function* processFileWatcher() {
  yield fork(takeLatest, SET_RAW_FILE, processFile);
}

/**
 * Root saga that manages watcher lifecycle.
 */
export function* rootSaga() {
  const task = yield fork(processFileWatcher);

  yield take(LOCATION_CHANGE);
  yield task(task);
}

export default [
  rootSaga,
];
