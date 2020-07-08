function saveQuote() {
  console.log('@@@ executing Save');
  const quoteName = document.getElementById('name');
  const quoteStatus = document.getElementById('status');
  const quoteLocked = document.getElementById('locked');
  const quotePrice = document.getElementById('number');;

  const quoteToSave = {name: quoteName,
                       status:quoteStatus,
                       locked:quoteLocked,
                       price:quotePrice};
  publishCanvasEvent('Canvas.quoteSave', quoteToSave);
  
}

function publishCanvasEvent (name, payload) {
  console.log('@ Publishing event ', payload);
  sfdc.canvas.controller.publish({
    name: name ,
    payload: payload
  })
}