/**
 * Tests for HomePage sagas
 */

import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { createMockTask } from 'redux-saga/utils';
import { fork, take, cancel, call, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  processFile,
  processFileWatcher,
  rootSaga,
} from '../sagas';
import { SET_RAW_FILE } from '../constants';
import { setFileData } from '../actions';

import { getDataFromFile } from 'utils/native';

describe('processFile Saga', () => {
  const file = 'foo';
  const action = { file };

  it('should call getDataFromFile', () => {
    const processFileSaga = processFile(action);
    const callDescriptor = processFileSaga.next();
    expect(callDescriptor.value).toEqual(call(getDataFromFile, file));
  });

  it('should save the file data', () => {
    const processFileSaga = processFile(action);
    const fileData = { foo: 'bar' };
    processFileSaga.next();
    const putDescriptor = processFileSaga.next(fileData);
    expect(putDescriptor.value).toEqual(put(setFileData(fileData)));
  });
});


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
