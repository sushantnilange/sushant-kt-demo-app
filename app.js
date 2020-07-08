const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const decode = require('salesforce-signed-request');

const app = express();
const db = mongoose.connect(process.env.MONGO_URI);
const Quote = require('./models/quoteModel');
const quoteRouter = require('./routes/quoteRouter')(Quote);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
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
  const route = context.environment.parameters.route;
  const splitedArray = route.split('/');
  console.log('Quote Id', splitedArray[2]);
  Quote.findById(splitedArray[2], (err, quote) => {
    if (err) {
      console.log('I am here ', err);
      return res.send(err);
    } 
    console.log(' Mongo Quote -->', JSON.stringify(quote));
    res.render('index', { quote: quote});
  });
  //res.render('index', { context: context });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});
