var mongoose = require('mongoose');

// define a schema for our car model
// every model starts with a mongoose Schema
var carSchema = new mongoose.Schema({
  color: {
    type: String,
    required: "Please provide a color"
  },
  make: {
    type: String,
    required: "Please provide a Make"
  },
  model: {
    type: String,
    required: "Please provide a Model"
  },
  year: {
    type: Number,
    required: "Cars need a Year yo"
  },
  isAutomatic: {
    type: Boolean,
    default: false
  }
});

// make this model available everywhere else
module.exports = mongoose.model('Car', carSchema)
