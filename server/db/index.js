//this is the access point for all things database related!

const db = require('./database');
const Address = require('./models/address');
const Order = require('./models/order')
const User = require('./models/user')
const Product = require('./models/product')


Order.belongsToMany(Product, {through: 'product_orders'});
Product.belongsToMany(Order, {through: 'product_orders'});

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
