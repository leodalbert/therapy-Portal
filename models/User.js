const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  password: String,
  googleId: String,
  facebookId: String,
  email: String,
});

mongoose.model('users', userSchema);
