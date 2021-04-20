const Sequelize = require('sequelize');
const db = require('../db');

// export Order Model
module.exports = db.define('order', {
  orderDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    }
  },
  orderStatus: {
    type: Sequelize.ENUM(['processed', 'shipped', 'delievered'])
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
      max: 500
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 0
  }
});
