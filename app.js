const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const decode = require('salesforce-signed-request');

const app = express();
const db = mongoose.connect(process.env.MONGO_URI);
const Quote = require('./models/quoteModel');
const quoteRouter = require('./routes/quoteRouter')(Quote);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/api', quoteRouter);

const port = process.env.PORT || 3000;
const consumerSecret = process.env.CONSUMER_SECRET;

app.get('/', (req, res) => {
  res.send('WELCOME To my API!');
});

app.post('/signedrequest', (req, res) => {
  let signedRequest = decode(req.body.signed_request, consumerSecret);
  let context = signedRequest.context;
  console.log('@@canvas request', JSON.stringify(context));
  const route = context.parameters;
  if( route ) {
    const splitedArray = route.split('/');
    console.log('Quote Id ', splitedArray[2]);
    //Quote.findById
  }
  res.render('index', { context: context });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});
