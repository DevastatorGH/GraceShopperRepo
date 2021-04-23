const Sequelize = require('sequelize');
const db = require('../database');

// export Product Model
const Product = db.define('product', {
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
  },
  imageUrl: {
    type: Sequelize.TEXT,
    default:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fvistapointe.net%2Fquestion-mark.html&psig=AOvVaw0k1HLYDEeKVly3s5mX-tEA&ust=1619123528840000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi_5qiXkPACFQAAAAAdAAAAABAI'
  }
});

module.exports = Product;
