const router = require('express').Router();
const Product = require('../db/models/product');
const Order = require('../db/models/order')
const User = require('../db/models/user');
const productOrder = require('../db/models/productOrder')

// Other Models may be needed here
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    console.log('In Products Route');
    const allProducts = await Product.findAll();
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      attributes: { exclude: ['inventory'] }
    });

    if (!singleProduct) {
      const err = Error('Product not found');
      err.status = 400;
      throw err;
    }
    res.json(singleProduct);
  } catch (error) {
    next(error);
  }
});

// const requireToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     console.log(req.headers.authorization, 'heders')
//     const user = await User.findByToken(token);
//     req.user = user;
//     next();
//   } catch(error) {
//     next(error);
//   }
// };

router.get('/:id/order', /*requireToken,*/ async (req, res, next) => {
  try {
    console.log(req.params.userId, 'IDIDID')
    if (req.user.id !== req.params.id) {
      throw new Error('Unauthorized');
    }

    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        orderStatus: 'pending'
      }
    });
    const productOrder = await productOrder.findAll({
      where: {
        orderId: order.id
      }
    })
    const products = await Product.findAll({
      where: {
        id: productOrder.productId
      }
    })
    res.send({order, productOrder, products})
  } catch (error) {
      next(error)
  }
})
