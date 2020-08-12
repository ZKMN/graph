const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serialSchema = new Schema({
  name: String,
  genre: String,
  rate: Number,
  watched: Boolean,
});

module.exports = mongoose.model('Serial', serialSchema);
