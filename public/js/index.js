function saveQuote() {
  console.log('@@@ executing Save');
  const quoteName = document.getElementById('name').value;
  const quoteStatus = document.getElementById('status').value;
  const quoteLocked = document.getElementById('locked').value;
  const quotePrice = document.getElementById('number').value;

  const quoteToSave = {name: quoteName,
                       status:quoteStatus,
                       locked:quoteLocked,
                       price:quotePrice};
  publishCanvasEvent('Canvas.quoteSave', quoteToSave);
  
}

function publishCanvasEvent (name, payload) {
  console.log('@ Publishing event ', payload);
  Sfdc.canvas.controller.publish({
    name: name ,
    payload: payload
  })
}