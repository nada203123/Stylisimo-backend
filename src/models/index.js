const SubCategory = require('./subCategory');
const Category = require('./category');
const Product = require('./product');
const User = require('./user');
const Order = require('./order');
const OrderProduct = require('./OrderProduct')

SubCategory.belongsToMany(Category, { through: 'CategorySubCategory' });
Category.belongsToMany(SubCategory, { through: 'CategorySubCategory' });
Category.hasMany(Product,{ foreignKey: 'categoryId' })
Product.belongsTo(Category,{ foreignKey: 'categoryId' })
SubCategory.hasMany(Product,{foreignKey:'subCategoryId'})
Product.belongsTo(SubCategory,{foreignKey:'subCategoryId'})
Order.belongsTo(User,{ foreignKey: 'userId' })
User.hasMany(Order,{ foreignKey: 'userId' })
//Order.belongsToMany(Product,{ through: OrderProduct })
//Product.belongsToMany(Order,{ through: OrderProduct })

Order.associate({ Product, OrderProduct });
Product.associate({ Order, OrderProduct });
OrderProduct.associate({ Order, Product });