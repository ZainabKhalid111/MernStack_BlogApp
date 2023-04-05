const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },

  // connection between bllog and users
  blogs: [{
    type: mongoose.Types.ObjectId,
    ref: 'Blog'
  }]
});

// collection name , schema name
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
