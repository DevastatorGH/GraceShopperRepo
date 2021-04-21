const Sequelize = require('sequelize');
const db = require('../db');

// export Product Model
module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 0
  }
});
