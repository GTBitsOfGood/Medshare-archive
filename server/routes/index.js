const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('this is an API route');
});

/*
  GET search based on query

  checks to see if query word matches any of the attributes in Product
  more specifically ProductName, Category Name, Sub Category, ProductRef

  Args:
    q (str): query key word

  Returns:
    array of all matching products
 */
router.get('/search', async (req, res) => {
  const { q } = req.query;
  const queries = q.split(' ');
  try {
    const products = await searchController.fuzzyQueryProducts(queries);
    return res.send(products);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/*
  GET autocomplete search based on prefix

  Args:
    q (str): prefix query word

  Returns:
    array of top 7 possible terms
 */
router.get('/autocomplete', async (req, res) => {
  const { q } = req.query;
  const query = q.split(' ').pop();
  try {
    const products = await searchController.fuzzyQueryProducts([query]);
    const completes = searchController.autocompleteTerms(products, q);
    return res.send(completes);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/reset', async (req, res) => {
  const r = await searchController.resetProductCount();
  res.send(r);
});

router.get('/test', async (req, res) => {
  const r = await searchController.testProductCounter();
  res.send(JSON.stringify(r.length));
});

module.exports = router;
