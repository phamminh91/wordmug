import fetch from 'unfetch';

const oxfordAppId = '06c8d114';
const oxfordAppKey = 'ffde054d0d7f6e57dd3019c5bdb5bced';
const oxfordApiUrl = 'https://od-api.oxforddictionaries.com/api/v1/entries/en';
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
    headers: {
      Accept: 'application/json'
    }
  });
}
