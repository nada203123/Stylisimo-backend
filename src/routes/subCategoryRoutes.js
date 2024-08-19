const express = require('express');
const { createSubCategory ,getSubCategories,getByCategory,deleteSubCategory,updateSubCategory,getSubCategoriesById} = require('../controllers/subCategoryController');
const router = express.Router();
router.post('/subCategory', createSubCategory)
router.get('/subCategories',getSubCategories)
router.get('/ByCategory/:id',getByCategory)
router.delete('/subCategories/:id',deleteSubCategory)
router.put('/subCategory/:id',updateSubCategory)
router.get('/getsubcategory/:id',getSubCategoriesById)
module.exports = router;