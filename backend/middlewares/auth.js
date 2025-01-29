const { getUser } = require('../services/auth');

async function RestrictToLoggedinUserOnly(req,res,next){
  const userUid = req.cookie?.uid;

  if(!userUid) {
    return res.status(200).json({msg:"app kaise ho"});
    // return res.redirect("http://localhost:5173/signin");
  }

  const user = getUser(userUid);

  if(!user) {
    return res.status(200).json({msg:"main theek hoon"});
    // return res.redirect("http://localhost:5173//signup");
  }

  req.user = user ;

  next();
}

module.exports = RestrictToLoggedinUserOnly;