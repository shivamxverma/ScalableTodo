const express = require('express');
const router = express.Router();
const {getTodos , createTodo , updateTodo , deleteTodo} = require('../controllers/todo');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware,getTodos);
router.post('/',authMiddleware,createTodo);

router.patch('/:id',authMiddleware,updateTodo);
router.delete('/:id',authMiddleware,deleteTodo); 

module.exports = router;