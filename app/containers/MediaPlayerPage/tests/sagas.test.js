/**
 * Tests for HomePage sagas
 */

import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { createMockTask } from 'redux-saga/utils';
// import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { fork, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  processFile,
  processFileWatcher,
  rootSaga,
} from '../sagas';
import { SET_RAW_FILE } from '../constants';

describe('processFileWatcher Saga', () => {
  const processFileWatcherGenerator = processFileWatcher();

  it('should watch for SET_RAW_FILE action', () => {
    const takeDescriptor = processFileWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, SET_RAW_FILE, processFile));
  });
});

describe('mediaPlayer rootSaga', () => {
  it('should finally cancel() the forked mediaPlayer saga', function* mediaPlayerSagaCancellable() {
    const mediaPlayerRootSaga = rootSaga();
    const mockTask = createMockTask();

    expect(mediaPlayerRootSaga.next().value).toEqual(fork(processFileWatcher));
    expect(mediaPlayerRootSaga.next(mockTask).value).toEqual(take(LOCATION_CHANGE));
    expect(mediaPlayerRootSaga.next().value).toEqual(cancel(mockTask));
  });
});
