const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  date: {
    type: Date,
    required: true
  },  
  time: {
    type: String, 
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: false
  }
});

const Todo = mongoose.model('Task', TodoSchema);
module.exports = Todo;
