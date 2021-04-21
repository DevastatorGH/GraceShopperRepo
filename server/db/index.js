//this is the access point for all things database related!

const db = require('./db');
const Address = require('./models/address');

const User = require('./models/User');

Order.hasMany(Product);
Product.belongsToMany(Order);

Order.belongsTo(User);
User.hasMany(Order);

Address.belongsTo(User);
User.hasMany(Address);

Order.hasOne(Address);
Address.belongsToMany(Order, {foreignKey: 'addressId'});

//Product.belongsTo(Category);
//Product.belongsToMany(Tag);

// Tag.belongsToMany(Product);
// Category.hasMany(Product);

module.exports = {
  db,
  models: {
    User
  }
};
