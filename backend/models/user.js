const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'todo'
  }]
});

// UserSchema.plugin(AutoIncrement, { inc_field: 'id' });

const user = mongoose.model('user',UserSchema);

module.exports = user;
