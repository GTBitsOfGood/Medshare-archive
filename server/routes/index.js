
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Product = mongoose.connection.model('Product', {}, 'Product');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('this is an API route');

/* GET search from query */
router.get('/search', async (req, res, next) => {
  const q = req.query.q;
  const query_fuzzy = {$regex: new RegExp(q, 'i')};
  let products = null;
  try {
    products = await Product.find().or([{ProductName: query_fuzzy}, {'Category Name': query_fuzzy}, {'Sub Category': query_fuzzy}, {ProductRef: query_fuzzy}]);
  } catch (err) {
    return res.status(500).send(err);
  }
  res.send(products);
});

module.exports = router;
