const Todo = require('../models/todo');

const getTodos = async (_, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const createTodo = async (req, res) => {
  const todo = req.body;
  const newTodo = new Todo({
    ...todo
  });

  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = req.body;

  if (!Todo.isValid(id)) return res.status(404).send('No todo with that id');

  const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });

  res.json(updatedTodo);
}

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!Todo.isValid(id)) return res.status(404).send('No todo with that id');

  await Todo.findByIdAndRemove(id);

  res.json({ message: 'Todo deleted successfully' });
}

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
}