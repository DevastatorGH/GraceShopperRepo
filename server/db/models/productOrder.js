const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("product_order", {
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: "product",
      key: "id",
    },
  },
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: "order",
      key: "id",
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  snapShotPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
