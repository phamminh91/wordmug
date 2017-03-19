import {
  UPDATE_TAGS,
  CHOOSE_WORD,
  CHOOSE_WORD_REQ,
  GET_TAGS_REQ,
  LOAD_DEF,
  LOAD_DEF_REQ,
  RECORD_PROGRESS,
  RECORD_PROGRESS_REQ
} from "./actionType";

function action(actionType, payload = {}) {
  return { type: actionType, ...payload };
}

export function loadDefinition(word) {
  return action(LOAD_DEF, { word });
}

export const loadDefinitionReq = {
  ok: (response, word) => action(LOAD_DEF_REQ.OK, { response, word }),
  err: error => action(LOAD_DEF_REQ.ERR, { error })
};

export function chooseWord() {
  return action(CHOOSE_WORD);
}

export const chooseWordReq = {
  ok: word => action(CHOOSE_WORD_REQ.OK, { word }),
  err: error => action(CHOOSE_WORD_REQ.ERR, { error })
};

export function observedWord(word) {
  return action(RECORD_PROGRESS, { word });
}

export const observedWordReq = {
  ok: word => action(RECORD_PROGRESS_REQ.OK, { word }),
  err: error => action(RECORD_PROGRESS_REQ.ERR, { error })
};

export function updateTags(word, tags) {
  console.log("adding tag");
  return action(UPDATE_TAGS, { word, tags });
}

export const getTagsReq = {
  ok: tags => action(GET_TAGS_REQ.OK, { tags }),
  err: error => action(GET_TAGS_REQ.ERR, { error })
};
