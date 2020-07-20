function saveQuote() {
  console.log('@@@ executing Save');
  const quoteName = document.getElementById('name').value;
  const quoteStatus = document.getElementById('status').value;
  const quoteLocked = document.getElementById('locked').value;
  const quotePrice = document.getElementById('number').value;
  const quoteId = document.getElementById('quoteId').value;

  const quoteToSave = {name: quoteName,
                       status:quoteStatus,
                       locked:quoteLocked,
                       price:quotePrice,
                       quoteId:quoteId};
  publishCanvasEvent('Canvas.quoteSave', quoteToSave);
  
}

function publishCanvasEvent (name, payload) {
  console.log('@ Publishing event ', payload);
  Sfdc.canvas.client.publish({
    name: name ,
    payload: payload
  })
}