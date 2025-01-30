const Todo = require("../models/todo");
const mongoose = require("mongoose");

const getTodos = async (_, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

const createTodo = async (req, res) => {
  const {todo,description,idDone, difficulty, date ,time} = req.body;
  
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const newTodo = new Todo({ 
    todo, 
    description, 
    isDone: false, 
    difficulty, 
    date, 
    time,
    user: req.user.id
   });

  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: "Error creating todo: " + error.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = req.body;

  // console.log("hii i am in update todo");

  // ✅ Check if ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid todo ID" });
  }

  const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });

  if (!updatedTodo) {
    return res.status(404).json({ message: "No todo found with this ID" });
  }

  await todo.save();
  res.json(updatedTodo);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  console.log("hii i am in delete todo");

  // ✅ Check if ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid todo ID" });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ message: "No todo found with this ID" });
  }

  if (todo.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized to delete this todo" });
  }

  await Todo.findByIdAndDelete(id);

  res.json({ message: "Todo deleted successfully" });
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
