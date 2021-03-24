const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myEntitySchema = new Schema(
  {
  prop1: String,
  prop2: Number,
},{
  collection: 'MyEntity',
  versionKey: false,
});

const MyEntityModel = mongoose.model('bla', myEntitySchema);

module.exports = MyEntityModel;