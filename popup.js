chrome.storage.sync.get([
  "encodePlaceholder",
  "encodeDisplay",
  "decodePlaceholder",
  "decodeDisplay"
], (defaultValues) => {
  encodeInput.placeholder = defaultValues.encodePlaceholder;
  encodeResult.innerText = defaultValues.encodeDisplay;
  decodeInput.placeholder = defaultValues.decodePlaceholder;
  decodeResult.innerText = defaultValues.decodeDisplay;
});

var hashids = 
  new Hashids("jS5qAlR0kHbAeqeuVowPBnyotKuTvvlGzIzkEtz79XQGB7BJHb", 8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

function debounce( callback, delay ) {
  let timeout;
  return function() {
      clearTimeout( timeout );
      timeout = setTimeout( callback, delay );
  }
}

function encode () {
  let encodePlaceholder = encodeInput.value;
  let encodeDisplay = hashids.encode(parseInt(encodePlaceholder));
  encodeResult.innerText = encodeDisplay;
  chrome.storage.sync.set({ encodeDisplay, encodePlaceholder });
}

function decode () {
  let decodePlaceholder = decodeInput.value.trim();
  let decodeDisplay = hashids.decode(decodePlaceholder);
  decodeResult.innerText = decodeDisplay;
  chrome.storage.sync.set({ decodeDisplay, decodePlaceholder });
}

function copy (element) {
  switch(element) {
    case "encode":
      navigator.clipboard.writeText(encodeResult.textContent);
      copiedEncode.classList.add("active")
      setTimeout(() => copiedEncode.classList.remove("active"), 2500)
      break;
    case "decode":
      navigator.clipboard.writeText(decodeResult.textContent);
      copiedDecode.classList.add("active")
      setTimeout(() => copiedDecode.classList.remove("active"), 2500)
      break;
  }
}

clipboardEncode.addEventListener("click", () => copy("encode"))
clipboardDecode.addEventListener("click", () => copy("decode"))

encodeInput.addEventListener("keyup", debounce(encode, 1500))
decodeInput.addEventListener("keyup", debounce(decode, 1500))
