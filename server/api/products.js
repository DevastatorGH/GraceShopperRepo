const router = require("express").Router();
// const { Order } = require("../../client/components/Order");
const OrderModel = require("../db/models/order");
const Product = require("../db/models/product");
const User = require("../db/models/user");
const ProductOrder = require("../db/models/productOrder");

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

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);

    if (!singleProduct) {
      const err = Error("Product not found");
      err.status = 400;
      throw err;
    }
    res.json(singleProduct);
  } catch (error) {
    next(error);
  }
});

router.put("/cart/add_product/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const user = req.user;
      const product = await Product.findByPk(req.params.id);

      let [order] = await OrderModel.findOrCreate({
        where: {
          userId: user.id,
          orderStatus: "pending",
        },
      });

      order = await order.update({
        totalPrice:
          order.totalPrice +
          req.body.orderDetails.quantity * req.body.orderDetails.priceSnapshot,
        totalItems: order.totalItems + req.body.orderDetails.quantity,
      });

      user.addOrder(order);

      let [productOrder] = await ProductOrder.findOrCreate({
        where: {
          orderId: order.id,
        },
      });

      productOrder = await productOrder.update({
        quantity: req.body.orderDetails.quantity + productOrder.quantity,
        priceSnapshot: req.body.orderDetails.priceSnapshot,
      });

      productOrder.setOrder(order);
      productOrder.setProduct(product);

      product.update({ inventory: product.inventory });
      console.log(productOrder);
      res.json(product);
    }
  } catch (error) {
    next(error);
  }
});

// router.get("/guest/:cart", async (req, res, next) => {
//   console.log(req.params.cart, "inside route");
//   let cart = JSON.parse(req.params.cart);
//   try {
//     let products = [];
//     let totalItems = 0;
//     let totalPrice = 0;

//     for (let i = 0; i < cart.length; i++) {
//       let obj = cart[i];
//       let id = Object.keys(obj)[0];
//       id = Number(id);
//       let product = await Product.findByPk(id);
//       totalItems += obj[id];
//       totalPrice += product.price * obj[String(id)];
//       products.push({ product: product, quantity: obj[String(id)] });
//     }
//     res.json({
//       products: products,
//       totalItems: totalItems,
//       totalPrice: totalPrice,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/user/cart", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      let order = await OrderModel.findOne({
        where: {
          userId: req.user.id,
          orderStatus: "pending",
        },
      });
      
      console.log(await order.getProductOrders())
      res.send(await order.getProductOrders());
    }
  } catch (error) {
    next(error);
  }
});

router.put("/user/cart/checkout", requireToken, async (req, res, next) => {
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
      let id = productOrder[i].dataValues.id;
      let product = await Product.findByPk(id);
      products.push({
        product: product,
        quantity: productOrder[i].dataValues.quantity,
      });
    }
    res.json(
      order.getProductOrders()
    );
  }
  } catch (error) {
    next(error);
  }
});

//checkout
// router.put('/checkout', async (req, res, next) => {
//check token => if user exists => update order status
//else
//1.create a new user
//2.create a new order
//user.setOrder(order)
//3.create newProductOrder => product_order
//2. for all products from local storage => newProductOrder.setOrder(order)
//newProductOrder.setProduct(product)
// }
