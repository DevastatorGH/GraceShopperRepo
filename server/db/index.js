//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');

Order.belongsToMany(Product, { through: 'product_orders' });
Product.belongsToMany(Order, { through: 'product_orders' });

Order.belongsTo(User);
User.hasMany(Order);

Address.belongsTo(User);
User.hasMany(Address);

Product.belongsTo(Category);
Product.belongsToMany(Tag);

Tag.belongsToMany(Product);
Category.hasMany(Product);

module.exports = {
  db,
  models: {
    User
  }
};
