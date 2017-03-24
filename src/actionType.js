function actionRequest(actionType) {
  return {
    REQ: `${actionType}.REQ`,
    OK: `${actionType}.OK`,
    ERR: `${actionType}.ERR`,
  };
}

export const LOAD_DEF_REQ = actionRequest('LOAD_DEF_REQ');
export const CHOOSE_WORD_REQ = actionRequest('CHOOSE_WORD_REQ');
export const RECORD_PROGRESS_REQ = actionRequest('RECORD_PROGRESS_REQ');
export const UPDATE_TAGS_REQ = actionRequest('UPDATE_TAGS_REQ');
export const GET_TAGS_REQ = actionRequest('GET_TAGS_REQ');
