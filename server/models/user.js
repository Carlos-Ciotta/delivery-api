const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id_user: {
    type: Number,
    required: true,
    unique: true
  },
  tipo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;