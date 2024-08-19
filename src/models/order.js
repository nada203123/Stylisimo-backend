const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const OrderProduct = require('./OrderProduct');

const Product = require('./product')


const Order = sequelize.define('Order', {
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
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },
  governorate: {
    type: DataTypes.STRING,
    allowNull: false
  },
 address: {
    type: DataTypes.STRING,
    allowNull: false,
  
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
 
}, {
  tableName: 'orders',
  timestamps: true, 
});

Order.associate = function (models) {
  Order.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: 'orderId'
  });
  
};

module.exports = Order;
