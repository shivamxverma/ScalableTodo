const User = require('../models/user');
const bcrypt = require('bcrypt');
const { v4 : uuidv4 } = require('uuid');
const {setUser,getUser} = require('../services/auth');

const getUserforSignin = async (req,res) => {
  const user = req.body;
  const {email , password}  = user;
  const isSignup = await User.findOne({ email });
  
  if(!isSignup){
    console.log('user does not exist');
    return res.json({msg:"use is not exist signup"});
  }

  const isValid = bcrypt.compareSync(password, isSignup.password);

  if(!isValid){
    // const token = createUserToken(user);
    return res.status(404).json({msg:"Invalid username and Password"});
  } 
  const sessionId = uuidv4();
  setUser(sessionId,user);
  res.cookie('uid',sessionId);
  
  return res.status(200).json({msg:"Logged in Successfully Broh"});
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const isSignup = await User.findOne({ email });

  if (isSignup) {
    return res.json({ msg: "User is already signed up" });
  }
  else {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await User.create({ name:name, email:email, password:hashedPassword });
    res.status(200).json({msg:"you are signed up"});
  }
};

module.exports = {
  getUserforSignin,
  createUser
}