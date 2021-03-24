const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orders = new Schema({
    userId: Number,
    cartId: Number,
    price: Number,
    address: {
        city: String,
        street: String,
    },
    deliveryDate: String,
    orderDate: String,
    creditCard: Number,

},
{
  collection: 'orders',
  versionKey: false,
});

const Orders = mongoose.model('orders', orders);

module.exports = Orders;