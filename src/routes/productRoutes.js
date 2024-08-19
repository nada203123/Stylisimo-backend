const express = require('express');
const {checkName,createProduct,getProducts,countProducts, getProductByCategory,getProductByCategoryAndSubCategory,getProductQuantity,deleteProduct,updateProduct ,getProductById} = require('../controllers/productController');

const upload = require('../middlewares/multerConfig');
const router = express.Router();


router.post('/addproduct',upload.single('image'),createProduct);
//router.post('/file',,uploadProductImage)
router.get('/products',getProducts)
router.get('/productsCategory/:id', getProductByCategory)
router.get('/category/:categoryId/subcategory/:subCategoryId/products',getProductByCategoryAndSubCategory)
router.delete('/deleteProduct/:id',deleteProduct)
router.put('/updateProduct/:id',updateProduct)
router.get('/product/:productId',getProductById)
router.get('/countProducts',countProducts)
router.get('/check',checkName)
router.get('/productsQuantity/:productId', getProductQuantity);

module.exports = router;