const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const cartItem = new Schema({
//     productId: Number,
//     quantity: Number,
//     price: Number,
// },
// {
//   versionKey: false,
// });

// const cart = new Schema({
//     createdAt: String,
//     status: {
//         type: String,
//         enum: ['active', 'closed'],
//     },
//     items: [cartItem],
//     price: String,
// },
// {
//   versionKey: false,
// });


const users = new Schema({
    id: String,
    name: {
        first: String,
        second: String,
    },
    email: String,
    password: String,
    address: {
        city: String,
        street: String,
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
    },
    lastCartId: String,
},
{
  collection: 'users',
  versionKey: false,
});

const Users = mongoose.model('users', users);

module.exports = Users;