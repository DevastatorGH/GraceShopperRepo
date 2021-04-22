//this is the access point for all things database related!

const db = require('./database');
const Address = require('./models/address');
const Order = require('./models/order')
const User = require('./models/user')
const Product = require('./models/product')
//const productOrder = require('./models/productOrder')
//const seed = require('../../seed')



Order.belongsToMany(Product, {through: "productOrder"});
Product.belongsToMany(Order, {through: "productOrder"});

// productOrder.belongsTo(Product)
// Product.hasMany(productOrder)
// productOrder.belongsTo(Order)
// Order.hasMany(productOrder) 

Order.belongsTo(User);

User.hasMany(Order);

// Address.belongsTo(User);
// User.hasMany(Address);

// Order.hasOne(Address);
// Address.belongsToMany(Order, {foreignKey: 'addressId'});

//Product.belongsTo(Category);
//Product.belongsToMany(Tag);

// Tag.belongsToMany(Product);
// Category.hasMany(Product);

module.exports = {
  db,
  User, 
  Order,
  Product, 
  Address
};
