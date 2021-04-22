const Address = require('./server/db/models/address');
const Order = require('./server/db/models/order')
const User = require('./server/db/models/user')
const Product = require('./server/db/models/product')
const products = require('./seed/Product')
const users = require('./seed/User')
const orders = require('./seed/Order')
const product_orders = require('./seed/Product_Orders')

const db = require('./server/db/database')

// const users = [
// {"id":1,"firstName":"Sanders","lastName":"Thorold","email":"sthorold0@tumblr.com","isAdmin":false,"username":"Hydrochoerus hydrochaeris","creditCard":"3561444698359754"},
// {"id":2,"firstName":"Deva","lastName":"Chidgey","email":"dchidgey1@mozilla.com","isAdmin":true,"username":"Hymenolaimus malacorhynchus","creditCard":"3557581469114540"},
// {"id":3,"firstName":"Georgine","lastName":"Surr","email":"gsurr2@jigsy.com","isAdmin":false,"username":"Ephipplorhynchus senegalensis","creditCard":"676182937260706544"}]

console.log('this is the products file on line 5 of seed')
const seed = async () => {
    console.log('before try')
    try {
       await db.sync({ force: true })
       console.log('force true')
       //await User.bulkCreate(users)
       await Product.bulkCreate(products)
       await Order.bulkCreate(orders)
       
       console.log('seeded products')
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
  