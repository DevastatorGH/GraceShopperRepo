const Sequelize = require('sequelize');
const db = require('../database');
module.exports = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: 0
  },
  priceSnapshot: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: 0
  },
});
