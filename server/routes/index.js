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
  if (q === null || typeof q !== 'string') {
    return res.status(400).send('Query word must exist!');
  }
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
  if (q === null || typeof q !== 'string') {
    return res.status(400).send('Query word must exist!');
  }
  const query = q.split(' ').pop();
  try {
    const completes = await searchController.autocompleteTerms(query);
    return res.send(completes);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
