import { takeEvery } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

import * as action from './action';
import * as type from './actionType';
import * as api from './api';
import storage from './storage';

function* loadDefinition({ word }) {
  const tasks = [];

  const stored = yield storage.get(`word:${word}`);
  let response = stored ? stored[`word:${word}`] : null;

  if (!response) {
    response = (yield call(api.fetchWordEntry, word)).response;
    tasks.push(fork(yield storage.set, { [`word:${word}`]: response }));
  }
  tasks.push(put(action.loadDefinitionReq.ok(response, word)));
  yield tasks;
}

function* watchLoadDefinition() {
  yield* takeEvery(type.LOAD_DEF, loadDefinition);
}

export default function*() {
  yield* [fork(watchLoadDefinition)];
}
