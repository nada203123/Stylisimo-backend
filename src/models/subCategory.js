const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Category = require('./category');

const SubCategory = sequelize.define('SubCategory', {
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
}, {
    tableName: 'subcategories',
    timestamps: false,
});

//SubCategory.belongsToMany(Category, { through: 'CategorySubCategory' });


module.exports = SubCategory;
