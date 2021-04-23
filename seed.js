const { Address, User, Product, Order, productOrder } = require('./server/db');
const products = require('./seed/Product');
const users = require('./seed/User');
const orders = require('./seed/Order');
const product_orders = require('./seed/Product_Orders');

const db = require('./server/db/database');



const seed = async () => {
  
  try {
    await db.sync({ force: true });
    await User.bulkCreate(users)
    await Product.bulkCreate(products)
    await Order.bulkCreate(orders)
    await productOrder.bulkCreate(product_orders)
    
  } catch (error) {
    console.log('error', error);
    db.close();
  }
};

module.exports = seed;

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
