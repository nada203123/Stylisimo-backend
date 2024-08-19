const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Order = require('./order')
const Product = require('./product')

const OrderProduct = sequelize.define('OrderProduct', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,   
      },
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Order',
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Product',
            key: 'id',
        },
    },
    size: {
        type: DataTypes.STRING, // Adjust this type based on how you want to store sizes
        allowNull: false,
    },
}, {
    tableName: 'OrderProduct',
    timestamps: true,
});


OrderProduct.associate = function (models) {
    OrderProduct.belongsTo(models.Order, {
        foreignKey: 'orderId',
        onDelete: 'CASCADE'
    });

    OrderProduct.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE'
    });
};

module.exports = OrderProduct;
