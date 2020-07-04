const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect(process.env.MONGO_URI);
const Quote = require('./models/quoteModel');
const quoteRouter = require('./routes/quoteRouter')(Quote);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', quoteRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('WELCOME To my API!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});
