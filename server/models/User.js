const MONGOOSE = require('mongoose');

const userSchema = new MONGOOSE.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  Date: { type: String, required: false, default: new Date() },
});

const User = MONGOOSE.model('User', userSchema);
module.exports = User;
