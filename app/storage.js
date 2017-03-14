// initialize firebase
// const firebaseApp = firebase.initializeApp(fireBaseConfig);
// const firebaseDb = firebaseApp.database();

function setLocal(key, value) {
  const localPromise = new Promise(resolve => {
    chrome.storage.local.set({ [key]: value }, () => resolve());
  });
  // const firebasePromise = firebaseDb.ref().set({
  //   [key]: value,
  // });
  return localPromise;
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
  local: {
    set: setLocal,
    get: getLocal,
  },
  sync: {
    set: setSync,
    get: getSync,
  },
};
