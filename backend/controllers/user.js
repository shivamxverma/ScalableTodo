const User = require('../models/user');
const bcrypt = require('bcrypt');
const {setUser,getUser} = require('../services/auth');


const getUser = async (req,res) => {
  const user = req.body;
  const {email , password}  = user;
  const isSignup = await User.findOne({ email: email });
  
  if(!isSignup){
    console.log('user does not exist');
    return res.json({msg:"use is not exist signup"});
  }

  const isValid = bcrypt.compareSync(password, isSignup.password);

  if(isValid){
    return res.status(200).json({msg:"user is logged in"});
  } else {
    const token = setUser(user);
    return res.status(500).json({msg:"server error"});
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const isSignup = await User.findOne({ email: email });

  if (isSignup) {
    console.log('User is already signup');
    return res.json({ msg: "User is already signed up" });
  }
  else {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await User.create({ name:name, email:email, password:hashedPassword });
    res.status(200).json({msg:"you are signed up"});
  }
}

module.exports = {
  getUser,
  createUser
}