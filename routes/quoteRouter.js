const express = require("express");

function routes(Quote) {
  const quoteRouter = express.Router();
  quoteRouter.route('/quotes')
    .post((req, res) => {
      const quote = new Quote(req.body);
      quote.save();
      return res.status(201).json(quote);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.status) {
        query.status = req.query.status;
      }
      Quote.find(query, (err, quotes) => {
        if (err) {
          return res.send(err);
        }
        return res.json(quotes);
      });
    });

  quoteRouter.route('/quotes/:quoteId').get((req, res) => {
    Quote.findById(req.params.quoteId, (err, quote) => {
      if (err) {
        return res.send(err);
      }
      return res.json(quote);
    });
  });

  return quoteRouter;
}

module.exports = routes;
