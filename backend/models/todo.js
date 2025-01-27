const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  todo : String,
  description : String,
  isDone : Boolean,
  difficulty : Number,
  date : {
    type : Date,
    default : Date.now
  },  
  time : {
    type : Number,
    default : 0
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }
});

const todo = mongoose.model('todos',TodoSchema);

module.exports = todo;