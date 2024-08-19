const SubCategory = require('../models/subCategory');
const Category = require('../models/category');
const { Sequelize } = require('sequelize');

async function createSubCategory(req, res) {
    try {
    const { name, categoryNames } = req.body;

    if (!categoryNames || categoryNames.length === 0) {
        return res.status(400).json({ error: 'At least one category must be provided' });
    }


    const subcategory = await SubCategory.create({ name , categoryNames });
   
    if (categoryNames && categoryNames.length > 0) {
        const categories = await Category.findAll({ where: { name: {
            [Sequelize.Op.in]: categoryNames  
        } } });
        console.log(categories)
        await subcategory.addCategories(categories);
    }
    res.status(201).json({ message: 'Subcategory added successfully', subcategory });
} catch (error) {
    console.error('Error adding subcategory:', error);
    res.status(500).json({ error: 'Failed to add subcategory' });
}
}

async function getSubCategories(req, res) {
try {
    const subcategories = await SubCategory.findAll({ include: [{model:Category, attributes: [ 'name'],through: {
        attributes: []  // Exclude the join table attributes
    }}] });
    res.status(200).json(subcategories);

}catch (error) {
    console.error('Error getting subcategories:', error);
    res.status(500).json({ error: 'Failed to get subcategories' });
}}

async function getByCategory(req,res) {
    const {id} = req.params;
    try {
        const category = await Category.findByPk(id, {
            include: [{
                model: SubCategory,
                attributes: ['id','name'],
                through: {
                    attributes: []  // Exclude the join table attributes
                }
            }]
        });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        console.error(category.dataValues.SubCategories);
        res.status(200).json(category.dataValues.SubCategories);

    }catch(error) {
        console.error('Error getting subcategories:', error);
        res.status(500).json({ error: 'Failed to get subcategories' });
    }
}
async function deleteSubCategory (req,res) {
    const {id} = req.params;
    try {
        const subCategory = await SubCategory.findByPk(id);
        if(!subCategory) {
            res.status(404).json({ error: 'SubCategory not found' });
        }
        await subCategory.destroy();
        res.status(200).json({ message: 'SubCategory deleted' });


    } catch (error) {
        res.status(500).json({ error: 'Failed to delete SubCategory' });
    }
}
async function updateSubCategory(req, res) {

    try {
        const { id } = req.params;
        const { name, categoryNames } = req.body;
        
        if(!name) {
            return res.status(400).json({ error: 'Name must be provided' });
        }

        if (!categoryNames || categoryNames.length === 0) {
            return res.status(400).json({ error: 'At least one category must be provided' });
        }

        let subcategory = await SubCategory.findByPk(id);
        
        if (!subcategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }
        
        subcategory.name = name;
        console.log(subcategory.name)
      
        const categories = await Category.findAll({ where: {  name: {
            [Sequelize.Op.in]: categoryNames
        }} });
           
        console.log('categories:', categoryNames);
        await subcategory.setCategories(categories);
        await subcategory.save();

        res.status(200).json({ message: 'Subcategory updated successfully', subcategory });
        
    } catch (error) {
        console.error('Error updating subcategory:', error);
        res.status(500).json({ error: 'Failed to update subcategory' });
    }
}
async function getSubCategoriesById(req, res) {
    const subCategoryId = req.params.id; 
  
    try {
      const subcategory = await SubCategory.findByPk(subCategoryId, {
        include: [{
          model: Category,
          attributes: ['name'],
          through: {
            attributes: [], // Exclude the join table attributes
          }
        }]
      });
  
      if (!subcategory) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
  
      res.status(200).json(subcategory);
    } catch (error) {
      console.error('Error getting subcategory by ID:', error);
      res.status(500).json({ error: 'Failed to get subcategory' });
    }
  }
  





module.exports={createSubCategory,getSubCategories,getByCategory,deleteSubCategory,updateSubCategory,getSubCategoriesById};