const router = require('express').Router();
const Product = require('../db/models/product');
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
