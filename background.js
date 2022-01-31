let encodePlaceholder = '1234';
let encodeDisplay = 'N2rkJGdL';
let decodePlaceholder = 'N2rkJGdL';
let decodeDisplay = '1234';

chrome.runtime.onInstalled.addListener(() => {
  const storage = {
    encodePlaceholder,
    encodeDisplay,
    decodePlaceholder,
    decodeDisplay
  }
  chrome.storage.sync.set(storage);
});
