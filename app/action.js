import {
  CHOOSE_WORD,
  CHOOSE_WORD_REQ,
  LOAD_DEF,
  LOAD_DEF_REQ,
  OBSERVED_WORD,
  OBSERVED_WORD_REQ,
} from './actionType';

function action(actionType, payload = {}) {
  return {
    type: actionType,
    ...payload,
  };
}

export function loadDefinition(word) {
  return action(LOAD_DEF, { word });
}

export const loadDefinitionReq = {
  ok: (response, word) => action(LOAD_DEF_REQ.OK, { response, word }),
  err: error => action(LOAD_DEF_REQ.ERR, { error }),
};

export function chooseWord() {
  return action(CHOOSE_WORD);
}

export const chooseWordReq = {
  ok: word => action(CHOOSE_WORD_REQ.OK, { word }),
  err: error => action(CHOOSE_WORD_REQ.ERR, { error }),
};

export function observedWord(word) {
  return action(observedWord, { word });
}

export const observedWordReq = {
  ok: word => action(OBSERVED_WORD_REQ.OK, { word }),
  err: error => action(OBSERVED_WORD_REQ.ERR, { error }),
};
