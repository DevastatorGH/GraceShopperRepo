const router = require('express').Router();
// const { Order } = require("../../client/components/Order");
const OrderModel = require('../db/models/order');
const Product = require('../db/models/product');
const User = require('../db/models/user');
const ProductOrder = require('../db/models/productOrder');

module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    let token;
    if (req.body.headers) {
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
  if (req.body.headers) {
    token = req.body.headers.authorization;
  } else {
    token = req.headers.authorization;
  }
  const user = await User.findByToken(token);
  req.user = user;
  console.log('req user', req.user);
  if (user.isAdmin) {
    next();
  } else {
    console.log('Not Authorized!');
    alert('Not Authorized!');
  }
};

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
});

router.post('/', requireToken, admin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);

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

router.put('/cart/add_product/:id', requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const user = req.user;
      const product = await Product.findByPk(req.params.id);

      let [order, isCreated] = await OrderModel.findOrCreate({
        where: {
          userId: user.id,
          orderStatus: 'pending',
        },
      });

      order = await order.update({
        totalPrice:
          order.totalPrice +
          req.body.orderDetails.quantity * req.body.orderDetails.priceSnapshot,
        totalItems: order.totalItems + req.body.orderDetails.quantity,
      });

      if (isCreated) {
        user.addOrder(order);
      }
      console.log(req.params.id);
      let productOrder = await ProductOrder.findOne({
        where: {
          orderId: order.id,
          productId: req.params.id,
        },
      });

      if (productOrder) {
        productOrder = await productOrder.update({
          quantity: req.body.orderDetails.quantity + productOrder.quantity,
          priceSnapshot: req.body.orderDetails.price,
        });
      } else {
        productOrder = await ProductOrder.create(req.body.orderDetails);
        productOrder.setOrder(order);
        productOrder.setProduct(product);
      }
      res.json(productOrder);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/user/cart', requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      let order = await OrderModel.findOne({
        where: {
          userId: req.user.id,
          orderStatus: 'pending',
        },
      });

      console.log(await order.getProductOrders());
      res.send(await order.getProductOrders());
    }
  } catch (error) {
    next(error);
  }
});

router.put("/user/checkout", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      let order = await OrderModel.findOne({
        where: {
          userId: req.user.id,
          orderStatus: "pending",
        },
      });
      order = await order.update({ orderStatus: "processed" });
      let productOrder = await order.getProductOrders();
      for (let i = 0; i < productOrder.length; i++) {
        let id = productOrder[i].dataValues.productId;
        let product = await Product.findByPk(id);
        console.log(productOrder.quantity, "product");
        product = await product.update({
          inventory: product.inventory - productOrder[i].dataValues.quantity,
        });
      }
      res.end();
    }
  } catch (error) {
    next(error);
  }
});

router.post("/guest/checkout", async (req, res, next) => {
  try {
    let user = await User.create({email: req.body.userInfo});


    let order = await OrderModel.create(req.body);
    order = await order.update({ orderStatus: "processed" });
    user.addOrder(order);

    let totalPrice = 0;
    let totalItems = 0;
    let cart = req.body.cart;
    console.log(req.body.cart, 'cart')
    for (let i = 0; i < cart.length; i++) {
      console.log(cart[i].price, 'ggggghghg')
      let product = cart[i].product;
      totalPrice += cart[i].quantity;
      totalItems += cart[i].price;
      let productOrder = await ProductOrder.create({quantity: cart[i].quantity, priceSnapshot: cart[i].price});
      productOrder.setOrder(order);
      productOrder.setProduct(product);
    }
console.log(totalPrice, totalItems)
    order = await order.update({
      totalPrice: totalPrice,
      totalItems: totalItems,
    });

    let productOrder = await order.getProductOrders();
    for (let i = 0; i < productOrder.length; i++) {
      let id = productOrder[i].dataValues.productId;
      let product = await Product.findByPk(id);
      console.log(productOrder.quantity, "product");
      product = await product.update({
        inventory: product.inventory - productOrder[i].dataValues.quantity,
      });
    }
    res.end();
  } catch (error) {
    next(error);
  }
});

router.put('/:id', requireToken, admin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireToken, admin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});
