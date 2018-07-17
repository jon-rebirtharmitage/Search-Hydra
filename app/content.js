window.addEventListener("mouseup", wordSelected);

function wordSelected() {
  let selectedText = window.getSelection().toString();
  if(selectedText.length > 0) {
      // Send selected text to background page
      chrome.runtime.sendMessage(selectedText);
  }
}