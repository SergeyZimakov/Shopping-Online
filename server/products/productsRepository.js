const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    name: String,
    price: String,
    img: String,
},
{
versionKey: false,
});

const products = new Schema({
    categoryName: String,
    products: [product],
},
{
  collection: 'products',
  versionKey: false,
});

const Products = mongoose.model('products', products);

module.exports = Products;