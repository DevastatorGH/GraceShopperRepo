const router = require("express").Router();
const { Order } = require("../../client/components/Order");
const OrderModel = require("../db/models/order");
const Product = require("../db/models/product");
const User = require("../db/models/user");
const productOrder = require("../db/models/productOrder");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    console.log("In Products Route");
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

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    const product = await Product.findByPk(req.params.id);

    let order = await OrderModel.findOne({
      where: {
        userId: 1,
        orderStatus: "pending",
      },
    });

    if (!order) {
      order = await OrderModel.create({
        orderDate: new Date().getDate(),
        totalItems: req.body.quantity,
        totalPrice: req.body.priceSnapshot,
        orderStatus: "pending",
      });
      user.addOrder(order);
    } else {
      order.update({ totalItems: order.totalItems + req.body.quantity });
    }

    const oldProductOrder = await productOrder.findOne({
      where: {
        orderId: order.id,
      },
    });

    if (oldProductOrder) {
      await oldProductOrder.update(req.body);
    } else {
      const newProductOrder = await productOrder.create(req.body);
      newProductOrder.setOrder(order);
      newProductOrder.setProduct(product);
    }
    product.update({ inventory: product.inventory - req.body.quantity });

    res.send();
  } catch (error) {
    next(error);
  }
});

//cart
// router.get('/guest/cart', async (req, res, next) => {
//}

//return all products in the cart + order
// router.get('/user/cart', async (req, res, next) => {
//1. get an order by user's id
//2. get all productOrders by the order.id
//3.for each productOrder use a method getProduct() => push it to an array of products
//4. get products => productOrder.getProducts()
//5. return all products and the order
// }

//checkout
// router.put('/checkout', async (req, res, next) => {
//check token => if user exists => update order status
//else
//1.create a new user
//2.create a new order
//user.addOrder(order)
//3.create newProductOrder => product_order
//2. for all products from local storage => newProductOrder.setOrder(order)
//newProductOrder.setProduct(product)
// }
