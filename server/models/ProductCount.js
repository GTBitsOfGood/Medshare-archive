const MONGOOSE = require('mongoose');

const productCountSchema = new MONGOOSE.Schema({
  Word: { type: String, required: true },
  Count: { type: Number, required: true },
});

const ProductCount = MONGOOSE.model('ProductCount', productCountSchema);
module.exports = ProductCount;
