const mongoose = require('mongoose');

const Product = mongoose.connection.model('Product', {}, 'Product');

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

module.exports = searchController;
