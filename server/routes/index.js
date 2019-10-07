const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Product = mongoose.connection.model('Product', {}, 'Product');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('this is an API route');
});

/* GET search from query */
router.get('/search', async (req, res) => {
  const { q } = req.query;
  const queryFuzzy = { $regex: new RegExp(q, 'i') };
  let products = null;
  try {
    products = await Product.find().or([
      { ProductName: queryFuzzy },
      { 'Category Name': queryFuzzy },
      { 'Sub Category': queryFuzzy },
      { ProductRef: queryFuzzy },
    ]);
  } catch (err) {
    return res.status(500).send(err);
  }
  return res.send(products);
});

module.exports = router;
