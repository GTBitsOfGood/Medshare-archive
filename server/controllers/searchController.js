const mongoose = require('mongoose');

const Product = mongoose.connection.model('Product', {}, 'Product');
const ProductCount = require('../models/ProductCount');

const searchController = {};

const fieldsOfInterest = [
  'ProductName',
  'CategoryName',
  'SubCategory',
  'ProductRef',
];

searchController.fuzzyQueryProducts = async queries => {
  const searchQuery = fieldsOfInterest.map(field => {
    return {
      $and: queries.map(query => {
        return { [field]: { $regex: new RegExp(query, 'i') } };
      }),
    };
  });

  return Product.find()
    .or(searchQuery)
    .then(products => {
      return products;
    });
};

/*
  Get all words from ProductCoutn that starts with the given query
  Sorted by the number of the times the word occurs

  Arg:
    q (str): prefix query word
    numOfTerms (optional): number of results to be returned

  Returns:
    array of top n possible terms
 */
searchController.autocompleteTerms = async (q, numOfTerms = 7) => {
  const query = q.trim().toLowerCase();

  const wordCounts = await ProductCount.find({
    Word: { $regex: new RegExp(`^${query}`) },
  })
    .sort({ Count: -1 })
    .limit(numOfTerms);
  return wordCounts;
};

/*
  Resets the ProductCount collections
  1) deletes everything in ProductCount
  2) fetches everything from Product collections
  3) parses all the words and keeps count of each word
  4) saves the word counts to ProductCount

  This ensures correct word count metadata between Product and ProductCount
 */
searchController.resetProductCount = async () => {
  await ProductCount.deleteMany({});
  const counter = {};
  // eslint-disable-next-line no-useless-escape, prettier/prettier
  const separators = new RegExp([' ', '/', '-', '&', '\\\*', '"', ',', '\\\\'].join('|'), 'g');

  // finds all products
  const products = await Product.find();

  products.forEach(product => {
    fieldsOfInterest.forEach(field => {
      const valueString = JSON.stringify(product.toObject()[field]);
      valueString.split(separators).forEach(word => {
        const formattedWord = word.trim().toLowerCase();
        counter[formattedWord] = (counter[formattedWord] || 0) + 1;
      });
    });
  });

  const productCountArray = Object.entries(counter).map(([word, count]) => {
    return new ProductCount({
      Word: word,
      Count: count,
    });
  });

  return ProductCount.insertMany(productCountArray, { ordered: false }).then(
    docs => {
      return docs;
    },
  );
};

module.exports = searchController;
