function actionRequest(actionType) {
  return {
    REQ: `${actionType}.REQ`,
    OK: `${actionType}.OK`,
    ERR: `${actionType}.ERR`
  };
}

export const LOAD_DEF = 'LOAD_DEF';
export const LOAD_DEF_REQ = actionRequest('LOAD_DEF');
