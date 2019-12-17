// include mongoose
var mongoose = require('mongoose');
// passport helper
var passportLocalMongoose = require('passport-local-mongoose');

// empty account schema.
var accountSchema = new mongoose.Schema({})

// add the passport mongoose helper to our account schema
accountSchema.plugin(passportLocalMongoose)

// make our schema into a model, and make it public
module.exports = mongoose.model('Account', accountSchema);
