const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  todo : String,
  description : String,
  isDone : Boolean,
});

const todo = mongoose.model('todos',TodoSchema);

module.exports = todo;