const {  DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const OrderProduct = require('./OrderProduct');
const Order = require('./order')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    
    },
    sizes: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
        
       
    },
    image: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categories', 
            key: 'id',
        }
    },
    subCategoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'subcategories', 
            key: 'id',
        }
    },
 
},{
    tableName: 'products',
    timestamps: false,
  });

  Product.associate = function (models) {
    Product.belongsToMany(models.Order, {
        through: models.OrderProduct, 
        foreignKey: 'productId',
        onDelete: 'CASCADE',
    });
    
};
  module.exports = Product;