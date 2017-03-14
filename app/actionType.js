function actionRequest(actionType) {
  return {
    REQ: `${actionType}.REQ`,
    OK: `${actionType}.OK`,
    ERR: `${actionType}.ERR`,
  };
}

export const LOAD_DEF = 'LOAD_DEF';
export const LOAD_DEF_REQ = actionRequest('LOAD_DEF');
export const CHOOSE_WORD = 'CHOOSE_WORD';
export const CHOOSE_WORD_REQ = actionRequest(CHOOSE_WORD);
export const OBSERVED_WORD = 'OBSERVED_WORD';
export const OBSERVED_WORD_REQ = 'OBSERVED_WORD_REQ';
