const express = require('express');
const router = express.Router();
const {getUserforSignin,createUser} = require('../controllers/user');

router.get('/',getUserforSignin);

router.post('/',createUser);

module.exports = router;