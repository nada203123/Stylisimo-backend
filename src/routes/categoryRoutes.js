const express = require('express');
const { createCategory , getCategories,deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

router.post('/category', createCategory);
router.get('/categories', getCategories);
router.delete('/categories/:id',deleteCategory)

module.exports = router;