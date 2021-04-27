const router = require('express').Router();
const User = require('../db/models/user');

module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    let token;
    if(req.body.headers){
      token = req.body.headers.authorization;
    } else {
      token = req.headers.authorization;
    }
    
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const admin = async (req, res, next) => {
  let token;
  if(req.body.headers) {
    token = req.body.headers.authorization
  } else {
    token = req.headers.authorization
  }
  const user = await User.findByToken(token)
  req.user = user
  console.log(req.user)
  if(user.isAdmin) {
    next()
  }
  else {
    console.log('Not Authorized!')
    alert('Not Authorized!')
  }
}

router.get('/', requireToken, admin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
