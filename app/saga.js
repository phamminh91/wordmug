import { takeEvery } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

import * as action from './action';
import * as type from './actionType';
import * as api from './api';

function* loadDefinition({ word }) {
  const { response } = yield call(api.fetchWordEntry, word);
  yield put(action.loadDefinitionReq.ok(response, word));
}

function* watchLoadDefinition() {
  yield* takeEvery(type.LOAD_DEF, loadDefinition);
}

export default function*() {
  yield* [fork(watchLoadDefinition)];
}
