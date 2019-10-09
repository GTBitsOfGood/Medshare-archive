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

searchController.resetProductCount = async () => {
  ProductCount.deleteMany({});
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
  productCountArray.forEach(p => console.log(p));
  console.log(productCountArray.length);
  return ProductCount.insert(productCountArray).then(docs => {
    console.log(docs, '!!!');
    return docs;
  });
};

searchController.testProductCounter = async () => {
  return ProductCount.find({}).then(counts => {
    return counts;
  });
};

module.exports = searchController;
