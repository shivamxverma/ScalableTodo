const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name : String,
  email : String,
  password : String,
  todos : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'todo'
  }]
})

const user = mongoose.model('user',UserSchema);

module.exports = user;
