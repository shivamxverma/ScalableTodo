const User = require('../models/user');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const isSignup = await User.findOne({ email: email });

  if (isSignup) {
    console.log('User is already signup');
    return res.json({ msg: "User is already signed up" });
  }
  else {
    await User.create({ name, email, password });
    res.status(200).json({msg:"you are signed up"});
  }
}

module.exports = createUser;