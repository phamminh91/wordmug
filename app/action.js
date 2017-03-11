import { LOAD_DEF, LOAD_DEF_REQ } from './actionType';

function action(actionType, payload = {}) {
  return {
    type: actionType,
    ...payload
  };
}

export function loadDefinition(word) {
  return action(LOAD_DEF, { word });
}

export const loadDefinitionReq = {
  ok: (response, word) => action(LOAD_DEF_REQ.OK, { response, word }),
  err: error => action(LOAD_DEF_REQ.ERR, { error })
};
