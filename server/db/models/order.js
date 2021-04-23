const Sequelize = require("sequelize")
const db = require("../database")

// export Order Model
module.exports = db.define("order", {
  orderDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    }
  },
  orderStatus: {
    type: Sequelize.ENUM(["pending", "processed", "shipped", "delievered"]),
    defaultValue: "pending"
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  totalItems: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})
