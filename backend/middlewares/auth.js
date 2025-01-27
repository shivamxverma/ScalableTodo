const { getUser } = require('../services/auth');

async function RestrictToLoggedinUserOnly(req,res,next){
  const userUid = req.headers["Authorization"];

  if(!userUid) return res.redirect("/signin");

  const user = getUser(userUid);

  if(!user) return res.redirect('/signin');

  req.user = user ;

  next();
}

module.exports = RestrictToLoggedinUserOnly;