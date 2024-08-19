const Product = require('../models/product')
const Category = require ('../models/category');
const SubCategory = require('../models/subCategory');
const OrderProduct = require ('../models/OrderProduct')




async function createProduct(req, res) {
    try {
        
        const { name, price, sizes, categoryId, subCategoryId } = req.body;
        const image = req.file ? req.file.filename : null;
        
        let sizesArray;
        try {
            sizesArray = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
        } catch (error) {
            return res.status(400).json({ message: 'Invalid sizes format. Must be a valid JSON array.' });
        }
        console.log('sizearray',sizesArray)
        const categoryExists = await Category.findByPk(categoryId);
        if (!categoryExists) {
            return res.status(400).json({
                message: 'Category ID does not exist.',
            });
        }
   
   
        
        const subCategoryExists = await SubCategory.findByPk(subCategoryId);
        if (!subCategoryExists) {
            return res.status(400).json({
                message: 'Subcategory ID does not exist.',
            });
          
        }

        const existingProduct = await Product.findOne({
            where: {
                name: name,
            },
        });

        if (existingProduct) {
            return res.status(400).json({
                message: 'Product name must be unique. This name already exists.',
            });
        }
     
        const newProduct = await Product.create({name,price, sizes: sizesArray,image,categoryId,subCategoryId}); 
        console.log('sizes',sizes)
        console.log('image',image)
        console.log('image',newProduct.dataValues)
        
        return res.status(201).json({
            message: 'Product added successfully',
            product: newProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({
            message: 'Error adding product: ' + error.message,
        });
    }


    }


async function getProducts (req,res) {
    const { page = 1, size = 3 } = req.query;
    const offset = (page - 1) * size;
    const limit = parseInt(size);
try {
    
    //const  products = await Product.findAll();
   // res.status(200).json(products);
   const { count, rows: products } = await Product.findAndCountAll({
    offset,
    limit
});
products.forEach(product => {
    console.log("Sizes:", product.sizes);
});
const productsWithParsedSizes = products.map(product => {
    return {
        ...product.dataValues,
    // sizes: JSON.parse(`[${product.sizes}]`) // Parse the sizes string into an array
        sizes: product.sizes, // Parse the sizes string into an array
        //sizes: Array.isArray(product.sizes) ? product.sizes : JSON.parse(`[${product.sizes}]`)
        image: product.image ? `../files/${product.image}` : null
    };
});
res.status(200).json({
    totalItems: count,
    products: productsWithParsedSizes,
    totalPages: Math.ceil(count / limit),
    currentPage: page
});
console.log('products',products)
} catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Failed to get products' });
}

}



async function getProductByCategory(req,res) {
    const {id} = req.params;
    try {
        
        const category = await Category.findByPk(id, {
            include: [{
                model: Product,
                attributes: ['id', 'name', 'price', 'sizes', 'image', 'subCategoryId'],
                
            }]
        });
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const productsWithImagePath = category.Products.map(product => {
            return {
                ...product.dataValues,
                image: product.image ? `../files/${product.image}` : null // Assuming images are stored in the 'uploads' directory
            };
        });
       
        res.status(200).json(productsWithImagePath);

    }catch(error) {
        console.error('Error getting products:', error);
        res.status(500).json({ error: 'Failed to get products' });
    }
}

async function checkName (req,res) {
    const { name } = req.query;
console.log(req.query)
  try {
    const existingProduct = await Product.findOne({ where: { name} });
    if (existingProduct) {
      return res.status(200).json(false); // Name is not unique
    } else {
      return res.status(200).json(true); // Name is unique
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to check product name' });
  }
}



async function getProductByCategoryAndSubCategory(req, res) {
    const { categoryId, subCategoryId } = req.params;

    try {
        
        const categoryExists = await Category.findByPk(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ error: 'Category not found' });
        }

        
        const subCategoryExists = await SubCategory.findByPk(subCategoryId);
        if (!subCategoryExists) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }

        // Find products that match the categoryId and subCategoryId
        const products = await Product.findAll({
            where: {
                categoryId: categoryId,
                subCategoryId: subCategoryId
            },
            attributes: ['id', 'name', 'price', 'sizes', 'image', 'categoryId', 'subCategoryId']
        });

        const productsWithFullImagePath = products.map(product => ({
            ...product.dataValues,
            image: product.image ? `../files/${product.image}` : null
        }));

        res.status(200).json(productsWithFullImagePath);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ error: 'Failed to get products' });
    }
}


async function deleteProduct (req,res) {
    const {id} = req.params;
    try {
        const product = await Product.findByPk(id);
        console.log(product)
        if(!product) {
            res.status(404).json({ error: 'product not found' });
        }
        await OrderProduct.destroy({ where: { productId: id } });
        // Ensure sizes have no null quantities
        if (product.sizes && product.sizes.length > 0) {
            product.sizes = product.sizes.map(size => ({
                size: size.size,
                quantity: size.quantity ?? 0 // Convert null to 0
            }));
            console.log(product.sizes)
            // Save the updated product
            await product.save();
        }
       

        await product.destroy();
       
        res.status(200).json({ message: 'product deleted' });


    } catch (error) {
        console.error('Error details:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to delete product' });
    }
}

async function updateProduct(req, res) {

    try {
        const { id } = req.params;
        const { name, price } = req.body;

       

        let product = await Product.findByPk(id);
          
        if (!name) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        product.name = name;
        console.log(product.name)
        product.price = price;
      
        
        
        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
        
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
}

async function getProductById(req, res) {
    const {productId} = req.params; 
  
    try {
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'product not found' });
      }

      const productWithFullImagePath = {
        ...product.dataValues,
        image: product.image ? `../files/${product.image}` : null
    };

  console.log('product',product.dataValues)
  res.status(200).json(productWithFullImagePath);
    } catch (error) {
      console.error('Error getting product by ID:', error);
      res.status(500).json({ error: 'Failed to get product' });
    }
  }

  async function countProducts(req, res) {
    try {
  
      const productCount = await Product.count();
      res.status(200).json({ count: productCount });
    } catch (error) {
      console.error('Error counting products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async function getProductQuantity(req, res) {
    const { productId } = req.params;
    const { size } = req.query;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Assuming `sizes` is an array of objects like [{ size: "M", quantity: 10 }, { size: "L", quantity: 5 }]
        const sizeObject = product.sizes.find(s => s.size === size);

        if (!sizeObject) {
            return res.status(404).json({ error: 'Size not found for this product' });
        }

        res.status(200).json({ quantity: sizeObject.quantity });
    } catch (error) {
        console.error('Error getting product quantity:', error);
        res.status(500).json({ error: 'Failed to get product quantity' });
    }
}

module.exports = { checkName,createProduct,getProducts, getProductByCategory ,getProductByCategoryAndSubCategory,deleteProduct,updateProduct,getProductById,countProducts,getProductQuantity};
