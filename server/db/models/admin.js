const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const SALT_ROUNDS = 5;

const Admin = db.define('admin', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  },
  email:{
    type: Sequelize.STRING,
    validate: {
        isEmail: true
    }
  },  
})

module.exports = Admin

/**
 * instanceMethods
 */
Admin.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

Admin.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
Admin.authenticate = async function({ username, password }){
    const admin = await this.findOne({where: { username }})
    if (!admin || !(await admin.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return admin.generateToken();
};

Admin.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const admin = Admin.findByPk(id)
    if (!admin) {
      throw 'nooo'
    }
    return admin
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(admin) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (admin.changed('password')) {
    admin.password = await bcrypt.hash(admin.password, SALT_ROUNDS);
  }
}

Admin.beforeCreate(hashPassword)
Admin.beforeUpdate(hashPassword)
Admin.beforeBulkCreate(admin => {
    admin.forEach(hashPassword)
})
