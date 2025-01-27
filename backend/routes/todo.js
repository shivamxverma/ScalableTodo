const express = require('express');
const router = express.Router();
const {getTodos , createTodo , updateTodo , deleteTodo} = require('../controllers/todo');

router.get('/', getTodos);
router.post('/', (req,res)=>{
  createTodo(req,res);
});

router.
  route('/:id').
  patch(updateTodo).
  delete(deleteTodo);

module.exports = router;