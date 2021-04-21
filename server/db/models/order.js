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
    type: Sequelize.ENUM(['pending', 'processed', 'shipped', 'delievered']),
    default: 'pending'
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  totalItems: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 0
  }
});
