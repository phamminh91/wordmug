import * as types from '../actionType';

const init = {};

export default function dictionary(state = init, action) {
  switch (action.type) {
    case types.LOAD_DEF_REQ.OK: {
      const response = action.response;
      console.log('reducer', response);
      if (response && response[0]) {
        const first = response[0];
        return {
          ...state,
          [action.word]: {
            type: first.type,
            definition: stripHtmlTags(first.defenition),
            example: stripHtmlTags(first.example),
          },
        };
      }
      return state;
    }

    default:
      return state;
  }
}

// Oxford
// try {
//   const categories = action.response.results[0].lexicalEntries;
//   const wordSenses = categories[0].entries[0].senses[0];
//   const definition = wordSenses.definitions[0];
//   const examples = wordSenses.examples.map(e => e.text);
//   const pronunciation = categories[0].pronunciations[0];
//
//   const newState = {
//     ...state,
//     [action.word]: {
//       definition,
//       phonetic: pronunciation.phoneticSpelling,
//       audio: pronunciation.audioFile,
//       examples
//     }
//   };
//   return newState;
// } catch (e) {
//   console.warn('error', action.word);
//   return state;
// }

function stripHtmlTags(text) {
  const div = document.createElement('div');
  div.innerHTML = text;
  return div.textContent || div.innerText || '';
}
