const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Connect } = require('./utils/db');
const userRoute = require('./routes/user');
const todoRoute = require('./routes/todo');
const RestrictToLoggedinUserOnly = require('./middlewares/auth');
const port = process.env.PORT | 8000;
Connect('mongodb+srv://Shivam:Hanumaan@cluster0.leo9l.mongodb.net/mydb');

// app.use(RestrictToLoggedinUserOnly);

app.use(express.static('../frontend'));
app.use(cors());
app.use(cors({ origin: "http://localhost:5173"}));
app.use(cookieParser());

app.use(express.json());

app.use('/user',userRoute);
app.use('/todo',RestrictToLoggedinUserOnly,todoRoute);

app.listen(port,()=>{
  console.log(`Server is running at ${port}`);
});
