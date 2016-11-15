/**
 * Tests for HomePage sagas
 */

import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { createMockTask } from 'redux-saga/utils';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getRepos, getReposWatcher, rootSaga } from '../sagas';

import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

const username = 'mxstbr';

describe('getRepos Saga', () => {
  let getReposGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos();

    const selectDescriptor = getReposGenerator.next().value;
    expect(selectDescriptor).toEqual(select(selectUsername()));

    const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
    const callDescriptor = getReposGenerator.next(username).value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = [{
      name: 'First repo',
    }, {
      name: 'Second repo',
    }];
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(reposLoaded(response, username)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getReposGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(repoLoadingError(response)));
  });
});

describe('getReposWatcher Saga', () => {
  const getReposWatcherGenerator = getReposWatcher();

  it('should watch for LOAD_REPOS action', () => {
    const takeDescriptor = getReposWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, LOAD_REPOS, getRepos));
  });
});

describe('HomePage RootSaga', () => {
  it('should finally cancel() the forked getReposWatcher saga', () => {
    const homePageRootSaga = rootSaga();
    const mockTask = createMockTask();

    expect(homePageRootSaga.next().value).toEqual(fork(getReposWatcher));
    expect(homePageRootSaga.next(mockTask).value).toEqual(take(LOCATION_CHANGE));
    expect(homePageRootSaga.next().value).toEqual(cancel(mockTask));
  });
});
