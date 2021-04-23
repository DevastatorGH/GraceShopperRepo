const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("productOrder", {
  // productId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: "product",
  //     key: "id",
  //   },
  // },
  // orderId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: "order",
  //     key: "id",
  //   },
  // },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  priceSnapshot: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
