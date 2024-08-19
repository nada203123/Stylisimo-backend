const {  DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,   
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  otpCode: {
    type: DataTypes.INTEGER
  },
  passwordResetToken: {
    type: DataTypes.STRING
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'client',
    allowNull: false
  }
}, {
    tableName: 'users',
    timestamps: false,
});

module.exports = User;
