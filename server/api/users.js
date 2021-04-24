const router = require('express').Router();
const User = require('../db/models/user');
const Order = require('../db/models/order')
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(req.headers.authorization, 'heders')
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch(error) {
    next(error);
  }
};

router.get('/:id/order', requireToken, async (req, res, next) => {
  try {
    console.log(req.params.id, 'IDIDID')
    if (req.user.id !== req.params.id) {
      throw new Error('Unauthorized');
    }

    const order = await Order.findOne({
      where: {
        userId: req.params.id
      }
    });
  } catch (error) {
      next(error)
  }
})


