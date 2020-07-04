const moongoose = require('mongoose');

const { Schema } = moongoose;

const quoteModel = new Schema(
  {
    name: { type: String },
    description: { type: String },
    status: { type: String },
    locked: { type: Boolean, default: false },
    price: { type: Number },
  }
);

module.exports = moongoose.model('Quote', quoteModel);
