const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productsRepository = require('../products/productsRepository');

const cartItem = new Schema({
    productId: String,
    quantity: Number,
    price: Number

},
{
  versionKey: false,
});

const carts = new Schema({
    userId: String,
    createdAt: {
        type: String,
        default: new Date().toLocaleDateString(),
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active',
    },
    items: {
        type: [cartItem],
        default: []
    },
    price: {
        type: Number,
        default: 0
    },
},
{
    collection: 'carts',
    versionKey: false,
});

const Carts = mongoose.model('carts', carts);
module.exports = Carts;