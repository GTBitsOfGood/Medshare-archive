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

searchController.autocompleteTerms = (products, q, numOfTerms = 7) => {
  const query = q.toLowerCase();
  const counter = {};
  // eslint-disable-next-line no-useless-escape, prettier/prettier
  const separators = new RegExp([' ', '/', '-', '&', '\\\*', '"', ',', '\\\\'].join('|'), 'g');

  products.forEach(product => {
    fieldsOfInterest.forEach(field => {
      const valueString = JSON.stringify(product.toObject()[field]);
      valueString.split(separators).forEach(word => {
        const formattedWord = word.trim().toLowerCase();
        if (formattedWord.toLowerCase().startsWith(query)) {
          counter[formattedWord] = (counter[formattedWord] || 0) + 1;
        }
      });
    });
  });
  const counterArray = Object.entries(counter);
  counterArray.sort((a, b) => {
    return b[1] - a[1];
  });

  return counterArray.slice(0, numOfTerms).map(word => word[0]);
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
