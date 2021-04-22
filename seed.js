const Address = require('./server/db/models/address');
const Order = require('./server/db/models/order')
const User = require('./server/db/models/user')
const Product = require('./server/db/models/product')
//const ProductOrder = require('./server/db/models/productOrder')
const products = require('./seed/Product')
const users = require('./seed/User')
const orders = require('./seed/Order')
const product_orders = require('./seed/Product_Orders')

const db = require('./server/db/database')

console.log('this is the products file on line 5 of seed')
const seed = async () => {
    try {
       await db.sync({ force: true })
       await User.bulkCreate(users)
       await Product.bulkCreate(products)
       await Order.bulkCreate(orders)
       //await ProductOrder.bulkCreate(product_orders)
    }
    catch(error) {
        console.log("error", error)
        db.close()
    }
}

module.exports = seed

if (require.main === module) {
    seed()
      .then(() => {
        console.log('Seeding success!');
        db.close();
      })
      .catch((err) => {
        console.error('Oh noes! Something went wrong!');
        console.error(err);
        db.close();
      });
  }
  