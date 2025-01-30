const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

function generateToken(user){
  const payload = {
    _id: user._id,
    email: user.email
  }

  if(!process.env.JWT_SECRET){
    throw new Error("JWT Secret is missing");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7D' });
}

function verifyToken(token){
  if(!token) return null;

  if(!process.env.JWT_SECRET){
    throw new Error("JWT Secret is missing");
  }
  try{
    return jwt.verify(token,process.env.JWT_SECRET);
  }catch(error){
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
}
