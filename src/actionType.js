function actionRequest(actionType) {
  return {
    REQ: `${actionType}.REQ`,
    OK: `${actionType}.OK`,
    ERR: `${actionType}.ERR`
  };
}

export const LOAD_DEF = "LOAD_DEF";
export const LOAD_DEF_REQ = actionRequest(LOAD_DEF);
export const CHOOSE_WORD = "CHOOSE_WORD";
export const CHOOSE_WORD_REQ = actionRequest(CHOOSE_WORD);
export const RECORD_PROGRESS = "RECORD_PROGRESS";
export const RECORD_PROGRESS_REQ = actionRequest(RECORD_PROGRESS);
export const UPDATE_TAGS = "UPDATE_TAGS";
export const UPDATE_TAGS_REQ = actionRequest(UPDATE_TAGS);
export const GET_TAGS = "GET_TAGS";
export const GET_TAGS_REQ = actionRequest(GET_TAGS);
