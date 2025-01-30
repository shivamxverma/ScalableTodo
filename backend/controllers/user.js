const User = require('../models/user');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const {generateToken} = require('../services/auth');

const userLogin = async (req,res) => {
  try{
    const {email , password}  = req.body;
    const user = await User.findOne({ email });

    if(!user){
      return res.status(404).json({msg:"user not found"});
    }

    const isValid = bcrypt.compareSync(password, isSignup.password);

    if(!isValid){
      return res.status(404).json({msg:"Invalid Password"});
    } 
    // const token = generateToken(user);

    // res.cookie('token', token, {
    //   httpOnly: true, // Prevent client-side JS access
    //   secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    //   sameSite: 'strict', // Protect against CSRF
    //   path: '/', // Available site-wide
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });

      res.status(200).json({ msg: "User is Logged In" });
  } catch(error){
    res.status(500).json({msg:"Server Error"});
  }
};

const userSignup = async (req, res) => {
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
  userLogin,
  userSignup
}