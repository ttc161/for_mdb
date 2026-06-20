/* Dialogue functions */
function msg(text,title) {
  dialog().title(title || 'ℹ️').text(text).positiveButton("Ok", () => {return true}).show();
}
function msgUi(objUi,title) {
  dialog().title(title || 'ℹ️').view(objUi).positiveButton("Ok", () => {return true}).show();
}
function msgJSON(obj,title) {
  let json = JSON.stringify(obj);
  dialog().title(title || 'ℹ️').view(ui().edit(json)).positiveButton("Ok", () => {return true}).show();
}
