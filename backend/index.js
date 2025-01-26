const express = require('express');
const app = express();
const cors = require('cors');
const {Connect} = require('./utils/db');
const todoRoute = require('./routes/todo');
const todo = require('./models/todo');
// const userRoute = require('./routes/user');
const port = process.env.PORT | 8000;
const url = process.env.MONGODB_URL;
Connect(url);
app.use(express.json());
app.use(cors());
app.use('/todo',todoRoute);

app.listen(port,()=>{
  console.log(`Server is running at ${port}`);
});