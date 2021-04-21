const Address = require('./server/db/models/address');
const Order = require('./server/db/models/order')
const User = require('./server/db/models/user')
const Product = require('./server/db/models/product')
const products = require('./seed/Product')

const db = require('./server/db/database')

console.log('this is the products file on line 5 of seed', products)
const seed = async() => {
    try {
        console.log('inside seed function')
       // await db.sync({ force: true })
        //const users = await Promise.all()
    }
    catch(error) {
        console.log("error", error)
        db.close()
    }
}