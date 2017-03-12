// initialize firebase
const fireBaseConfig = {
  apiKey: "AIzaSyAXe19cAYaB_ZlxpcYeoma9P-cu3m31dxM",
  authDomain: "wordmug-75c35.firebaseapp.com",
  databaseURL: "https://wordmug-75c35.firebaseio.com",
  storageBucket: "wordmug-75c35.appspot.com",
  messagingSenderId: "676553309545"
};
// const firebaseApp = firebase.initializeApp(fireBaseConfig);
// const firebaseDb = firebaseApp.database();

function set(key, value) {
  // const localPromise = new Promise(resolve => {
  //   chrome.storage.local.set(items, () => resolve());
  // });
  // const firebasePromise = firebaseDb.ref().set({
  //   [key]: value,
  // });
  return Promise.all([]);
}

function get(key) {
  return new Promise(resolve => {
    chrome.storage.local.get(key, data => resolve(data));
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

export default {
  set,
  get
};
