function set(items) {
  return new Promise(resolve => {
    chrome.storage.local.set(items, () => resolve());
  });
}

function get(key) {
  return new Promise(resolve => {
    chrome.storage.local.get(key, data => resolve(data));
  });
}

export default {
  set,
  get
};
