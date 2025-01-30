// const { use } = require('../routes/user');
// const { getUser } = require('../services/auth');

// function checkForAuthentication(req,res,next){
//   req.user = null;
//   const authorizationHeaderValue = req.headers["authorization"];
//   if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")){
//     return next();
//   }

//   const token = authorizationHeaderValue.split("Bearer ")[1];
//   const user = getUser(token);

//   req.user = user;

//   next();
// }

// function restrictTo(roles){
//   return (req,res,next) => {
//     if(!req.user) return res.status(401).json({msg:"You are not logged in"});
//     if(!roles.includes(req.user.role)){
//       return res.status(403).json({msg:"Unauthorized"});
//     }
//     next();
//   }
// }

// async function RestrictToLoggedinUserOnly(req,res,next){
//   const userUid = req.headers["authorization"];
//   // console.log('Hello i am in middleware',userUid);

//   if(!userUid) {
//     return res.status(200).json({msg:"app kaise ho"});
//   }
  
//   const token = userUid.split('Bearer ')[1];
//   const user = getUser(token);

//   if(!user) {
//     return res.status(200).json({msg:"main theek hoon"});
//   }

//   req.user = user ;

//   next();
// }

// async function checkAuth(req,res,next){
//   const userUid = req.headers["authorization"];
//   const token = userUid.split('Bearer ')[1];
//   const user = getUser(token);

//   req.user = user ;
//   next();

// }

// module.exports = {
//   checkForAuthentication
// }


const jwt = require("jsonwebtoken");
const User = require("../models/user"); 

const authMiddleware = async (req, res, next) => {
  const token = req.header["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "your_secret_key");
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) throw new Error("User not found");
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
