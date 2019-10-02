var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Product = mongoose.connection.model('Product', {}, 'Product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("this is the home API route");
});

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
