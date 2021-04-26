const router = require("express").Router();
// const { Order } = require("../../client/components/Order");
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
      //update total sum
      order.update({ totalItems: order.totalItems + req.body.quantity });
    }

    const oldProductOrder = await productOrder.findOne({
      where: {
        orderId: order.id,
      },
    });

    if (oldProductOrder) {
      //not to forget
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

router.get('/guest/:cart', async (req, res, next) => {
  console.log(req.params.cart, 'inside route')
  let cart = JSON.parse(req.params.cart);
  try {
    let products = [];
    let totalItems = 0
    let totalPrice = 0;
    
    for(let i = 0; i < cart.length; i++){
      let obj = cart[i];
      let id = Object.keys(obj)[0];
      id = Number(id)
      let product = await Product.findByPk(id);
      totalItems += obj[id];
      totalPrice += product.price * obj[String(id)];
      products.push({'product': product, 'quantity': obj[String(id)]});
    }
    res.json({'products': products, 'totalItems': totalItems, 'totalPrice': totalPrice})
  } catch (error) {
    next(error);
  }
})

router.get('/user/cart', async (req, res, next) => {
  try {
    let order = await OrderModel.findOne({
      where: {
        userId: 1,
        orderStatus: "pending",
      },
    });
    let products = [];
    let productOrder = await order.getProductOrders();
    for (let i = 0; i < productOrder.length; i++){
      
      let id = productOrder[i].dataValues.id
      let product = await Product.findByPk(id);
      product.quantity = productOrder[i].dataValues.quantity
      products.push({'product': product, 'quantity': productOrder[i].dataValues.quantity})
    }
    res.json({'products': products, 'totalItems': order.totalItems, 'totalPrice': order.totalPrice})
  } catch (error) {
    next(error);
  }
})

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
