const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Connect } = require('./utils/db');
const userRoute = require('./routes/user');
const todoRoute = require('./routes/todo');
const port = process.env.PORT | 8000;
const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("Database URI is not defined. Please set DB_URI in your .env file.");
}

Connect(url);

app.use(express.static('../frontend'));
app.use(cors());
app.use(cors({ origin: "http://localhost:5173"}));
app.use(cookieParser());

app.use(express.json());

app.use('/user',userRoute);
app.use('/todo',todoRoute);

app.listen(port,()=>{
  console.log(`Server is running at ${port}`);
});
