import fetch from 'unfetch';
import { firebaseDb } from './db';

// const oxfordAppId = '06c8d114';
// const oxfordAppKey = 'ffde054d0d7f6e57dd3019c5bdb5bced';
// const oxfordApiUrl = 'https://od-api.oxforddictionaries.com/api/v1/entries/en';
const owlUrl = 'https://owlbot.info/api/v1/dictionary';

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    response.json.bind(response);
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function fetchInfo(url, opts) {
  return fetch(url, opts || {})
    .then(res =>
      new Promise(resolve => resolve(res))
        .then(checkStatus)
        .then(res => res.json())
        .then(response => ({ response }))
        .catch(ex => ({ error: ex })))
    .catch(err => new Promise(resolve => resolve({ error: 1 })));
}

export function fetchWordEntry(word) {
  return fetchInfo(`${owlUrl}/${word}`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
}

export function getWordTags(word) {
  return new Promise(resolve =>
    firebaseDb
      .ref(`dictionary/${word}/tags`)
      .once('value')
      .then(snapshot => resolve(snapshot.val() || [])));
}

export function updateTags(word, tags) {
  if (!tags.length) return Promise.resolve(null);

  const updates = {};
  for (let i = 0; i < tags.length; i++) {
    updates[tags[i]] = { [word]: 0 };
  }
  firebaseDb.ref(`tags`).update(updates);
  firebaseDb.ref(`dictionary/${word}/tags`).set(tags);
}
