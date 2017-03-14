import { takeEvery } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

import * as action from './action';
import * as type from './actionType';
import * as api from './api';
import storage from './storage';
import wordList from './wordlist';

function* loadDefinition({ word }) {
  const tasks = [];

  let response = yield storage.local.get(`word:${word}`);

  if (!response) {
    response = (yield call(api.fetchWordEntry, word)).response;
    console.log('saga:', response);
    tasks.push(fork(yield storage.local.set, `word:${word}`, response));
  }
  tasks.push(put(action.loadDefinitionReq.ok(response, word)));
  yield tasks;
}

function* watchLoadDefinition() {
  yield* takeEvery(type.LOAD_DEF, loadDefinition);
}

function* chooseWord() {
  const idx = ((yield storage.local.get('currentIdx')) % wordList.length) || 0;
  // console.log('saga:choose', idx);

  yield [
    put(action.chooseWordReq.ok(wordList[idx])),
    storage.local.set('currentIdx', idx + 1),
  ];
}

function* watchChooseWord() {
  yield* takeEvery(type.CHOOSE_WORD, chooseWord);
}

function* observedWord({ word }) {
  console.log(`saga:${word}:observed`);
}

function* watchObservedWord() {
  yield* takeEvery(type.OBSERVED_WORD, observedWord);
}

export default function* () {
  yield* [
    fork(watchLoadDefinition),
    fork(watchChooseWord),
    fork(watchObservedWord),
  ];
}
