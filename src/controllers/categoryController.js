const Category = require ('../models/category');

async function createCategory(req, res) {
    const { name } = req.body;
    try {
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
}

async function getCategories(req,res) {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);

    } catch (error) {
        res.status(500).json({ error: 'Failed to get categories' });
    }
}

async function deleteCategory (req,res) {
    const {id} = req.params;
    try {
        const category = await Category.findByPk(id);
        if(!category) {
            res.status(404).json({ error: 'Category not found' });
        }
        await category.destroy();
        res.status(200).json({ message: 'Category deleted' });


    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
}



module.exports = { createCategory,getCategories,deleteCategory };