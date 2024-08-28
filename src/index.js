const express = require('express');
const cors = require("cors");
const {  sequelize,testConnection } = require('./config/database');
require('./models/index')


const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require ('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')

const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000


app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200' 
}));
app.use(express.json())

app.use('/api/api/',categoryRoutes)
app.use('/api/subCategories',subCategoryRoutes)
app.use('/api/product',productRoutes)
app.use('/api/user',userRoutes);
app.use('/api/order',orderRoutes)

app.use('/files', express.static(path.join(__dirname, '../files')));






app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



async function syncDatabase() {
  try {
      await sequelize.sync({ force: false }); // Set to `true` if you want to drop and recreate the table
      console.log('Database synchronized successfully.');
  } catch (error) {
      console.error('Error synchronizing the database:', error);
  }
}

app.get('/', (req, res) => {
  res.send('Hello Wooooorld!');
});

app.listen(PORT, async () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
  await testConnection();
  await syncDatabase();
});