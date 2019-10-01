var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Product = mongoose.connection.model('Product', {}, 'Product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("this is the home API route");
});

/* GET search from query */
router.get('/search', (req, res, next) => {
  const q = req.query.q;
  const query_fuzzy = {$regex: new RegExp(q, 'i')};
  Product.find().or([{ProductName: query_fuzzy}, {'Category Name': query_fuzzy}, {'Sub Category': query_fuzzy}])
      .then(products => {
        return res.send(products);
      })
      .catch(err => {
        return next(err);
      })
});

module.exports = router;
