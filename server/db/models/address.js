const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
    city: {
        type: Sequelize.STRING,
        allowNull: false, 
        validate: {
            notEmpty: true
        }
    },
    streetAddress: {
        type: Sequelize.STRING,
        allowNull: false, 
        validate: {
            notEmpty: true
        }
    } ,
    apt: {
        type: Sequelize.STRING
    }, 
    country: {
        type: Sequelize.STRING,
        allowNull: false, 
        validate: {
            notEmpty: true
        }
    },
    zip: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        validate: {
            notEmpty: true
        }
    }
})
