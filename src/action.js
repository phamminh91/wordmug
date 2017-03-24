import {
  CHOOSE_WORD_REQ,
  GET_TAGS_REQ,
  LOAD_DEF_REQ,
  RECORD_PROGRESS_REQ,
  UPDATE_TAGS_REQ,
} from './actionType';

function action(actionType, payload = {}) {
  return { type: actionType, ...payload };
}

export const loadDefinitionReq = {
  req: word => action(LOAD_DEF_REQ.REQ, { word }),
  ok: (response, word) => action(LOAD_DEF_REQ.OK, { response, word }),
  err: error => action(LOAD_DEF_REQ.ERR, { error }),
};

export const chooseWordReq = {
  req: () => action(CHOOSE_WORD_REQ.REQ),
  ok: word => action(CHOOSE_WORD_REQ.OK, { word }),
  err: error => action(CHOOSE_WORD_REQ.ERR, { error }),
};

export const observedWordReq = {
  req: word => action(RECORD_PROGRESS_REQ.REQ, { word }),
  ok: word => action(RECORD_PROGRESS_REQ.OK, { word }),
  err: error => action(RECORD_PROGRESS_REQ.ERR, { error }),
};

export function updateTags(word, tags) {
  console.log('adding tag');
  return action(UPDATE_TAGS_REQ.REQ, { word, tags });
}

export const updateTagsReq = {
  req: (word, tags) => action(UPDATE_TAGS_REQ.REQ, { tags, word }),
  ok: word => action(UPDATE_TAGS_REQ.OK, { word }),
  err: (word, error) => action(UPDATE_TAGS_REQ.ERR, { error, word }),
};

export const getTagsReq = {
  req: word => action(GET_TAGS_REQ.REQ, { word }),
  ok: tags => action(GET_TAGS_REQ.OK, { tags }),
  err: error => action(GET_TAGS_REQ.ERR, { error }),
};
