import * as types from './actionType';

const init = {};

function dictionary(state = init, action) {
  switch (action.type) {
    case types.LOAD_DEF_REQ.OK: {
      try {
        const categories = action.response.results[0].lexicalEntries;
        const wordSenses = categories[0].entries[0].senses[0];
        const definition = wordSenses.definitions[0];
        const examples = wordSenses.examples.map(e => e.text);
        const pronunciation = categories[0].pronunciations[0];

        const newState = {
          ...state,
          [action.word]: {
            definition,
            phonetic: pronunciation.phoneticSpelling,
            audio: pronunciation.audioFile,
            examples
          }
        };
        return newState;
      } catch (e) {
        console.warn('error', action.word);
        return state;
      }
    }

    default:
      return state;
  }
}

export default {
  dictionary
};
