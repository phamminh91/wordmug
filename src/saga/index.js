import { takeEvery } from "redux-saga";
import { call, fork, put, spawn } from "redux-saga/effects";

import * as action from "../action";
import * as type from "../actionType";
import * as api from "../api";
import storage, { firebaseDb } from "../db";
import wordList from "../wordlist";

function* loadDefinition({ word }) {
  const { response } = yield call(api.fetchWordEntry, word);
  firebaseDb.ref(`dictionary/${word}`).update({ definitions: response });

  yield [
    spawn(loadWordTag, word),
    put(action.loadDefinitionReq.ok(response, word))
  ];
}

function* watchLoadDefinition() {
  yield* takeEvery(type.LOAD_DEF, loadDefinition);
}

function* loadWordTag(word) {
  const tags = yield call(api.getWordTags, word);
  yield put(action.getTagsReq.ok(tags));
  console.log("saga:tags", word, tags);
}

function* chooseWord() {
  const idx = (yield storage.local.get("currentIdx")) % wordList.length || 0;
  // console.log('saga:choose', idx);
  yield [
    put(action.chooseWordReq.ok(wordList[idx])),
    storage.local.set("currentIdx", idx + 1)
  ];
}

function* watchChooseWord() {
  yield* takeEvery(type.CHOOSE_WORD, chooseWord);
}

function* observedWord({ word }) {
  api.updateTags(word, [ "seen" ]);
  console.log("observing", word);
  const ref = firebaseDb.ref(`progress/${word}`);
  ref.transaction(val => val ? val + 1 : 1);
}

function* watchObservedWord() {
  yield* takeEvery(type.RECORD_PROGRESS, observedWord);
}

function* updateTags({ word, tags }) {
  console.log("saga:tags", word, tags);
  api.updateTags(word, tags);
}

function* watchUpdateTags() {
  yield* takeEvery(type.UPDATE_TAGS, updateTags);
}

export default function*() {
  yield* [
    fork(watchUpdateTags),
    fork(watchLoadDefinition),
    fork(watchChooseWord),
    fork(watchObservedWord)
  ];
}
