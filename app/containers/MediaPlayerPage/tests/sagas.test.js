import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { createMockTask } from 'redux-saga/utils';
import { fork, take, cancel, call, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  processFileSaga,
  processFileWatcher,
  rootSaga,
} from '../sagas';
import {
  PROCESS_FILE,
} from '../constants';

import {
  setRawFile,
} from '../actions';

import { getDataFromFile } from 'utils/native';

describe('processFile Saga', () => {
  const file = 'foo';
  const action = { file };
  const processFileGenerator = processFileSaga(action);

  it('should put setRawFile', () => {
    const putDescriptor = processFileGenerator.next();
    expect(putDescriptor.value).toEqual(put(setRawFile(file)));
  });

  it('should call getDataFromFile', () => {
    const callDescriptor = processFileGenerator.next();
    expect(callDescriptor.value).toEqual(call(getDataFromFile, file));
  });

  it('should save the file data', () => {
    // const processFileGenerator = processFileSaga(action);
    // const fileData = { foo: 'bar' };
    // processFileGenerator.next();
    // const putDescriptor = processFileGenerator.next(fileData);
    // expect(putDescriptor.value).toEqual(put(setFileData(fileData)));
  });
});

describe('processFileWatcher Saga', () => {
  const processFileWatcherGenerator = processFileWatcher();

  it('should watch for PROCESS_FILE action', () => {
    const takeDescriptor = processFileWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, PROCESS_FILE, processFileSaga));
  });
});

describe('mediaPlayer rootSaga', () => {
  it('should finally cancel() the forked mediaPlayer saga', () => {
    const mediaPlayerRootSaga = rootSaga();
    const mockTask = createMockTask();

    expect(mediaPlayerRootSaga.next().value).toEqual(fork(processFileWatcher));
    expect(mediaPlayerRootSaga.next(mockTask).value).toEqual(take(LOCATION_CHANGE));
    expect(mediaPlayerRootSaga.next().value).toEqual(cancel(mockTask));
  });
});
