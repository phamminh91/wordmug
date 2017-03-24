import * as firebase from 'firebase';

// initialize firebase
const config = {
  apiKey: 'AIzaSyAXe19cAYaB_ZlxpcYeoma9P-cu3m31dxM',
  authDomain: 'wordmug-75c35.firebaseapp.com',
  databaseURL: 'https://wordmug-75c35.firebaseio.com',
  storageBucket: 'wordmug-75c35.appspot.com',
  messagingSenderId: '676553309545',
};
const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebaseApp.database();

function setLocal(key, value) {
  return new Promise(resolve => {
    chrome.storage.local.set({ [key]: value }, () => resolve());
  });
}

function getLocal(key) {
  return new Promise(resolve => {
    chrome.storage.local.get(key, data => resolve(data[key]));
  });
  // return Promise.all([
  //   new Promise(resolve =>
  //       firebaseDb.ref(key).once('value').then(snapshot => resolve(snapshot.val())),
  //   ),
  //   new Promise(resolve => {
  //     chrome.storage.local.get(key, data => resolve(data));
  //   }),
  // ]);
}

function setSync(key, value) {}

function getSync(key) {}

export default {
  local: { set: setLocal, get: getLocal },
  sync: { set: setSync, get: getSync },
};
