const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  delivery: {
    type: String,
    required: true,
  },
  warranty: {
    type: String,
    required: true,
  },
  img: {
    type: [String],
    required: true,
  },
  dimimage: {
    type: [String],
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
  returns: {
    type: String,
    required: true,
  },
  pricing: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", product_schema);
