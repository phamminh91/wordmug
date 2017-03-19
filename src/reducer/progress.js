import * as type from "../actionType";

const init = { currentWord: "", impression: {} };

export default function(state = init, action) {
  switch (action.type) {
    case type.CHOOSE_WORD_REQ.OK:
      return { ...state, currentWord: action.word };

    default:
      return state;
  }
}
