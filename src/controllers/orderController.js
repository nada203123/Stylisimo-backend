const fs = require('fs');
const path = require('path');
const Order = require('../models/order')
const Product = require('../models/product')
const OrderProduct = require('../models/OrderProduct')
const nodemailer  = require('nodemailer')

const filePath = path.join(__dirname, '../governorates.json');


async function listGovernorates(req, res) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    try {
      let governorates = JSON.parse(data);

      // Remove duplicates and extract only the names
      const uniqueGovernorateNames = Array.from(
        new Set(governorates.map(g => g.governorate))
      );

      res.status(200).json(uniqueGovernorateNames);
      console.log(uniqueGovernorateNames);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Error parsing JSON' });
    }
  });
}

async function createOrder(req, res) {
  try {
    const { firstName, lastName, email, phoneNumber, governorate, address, postalCode, products, userId } = req.body;

    // Create a new order
    const newOrder = await Order.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      governorate,
      address,
      postalCode,
      userId
    });

    console.log('products', products)

    const orderProducts = products.map(({ productId, size,quantity }) => ({
      orderId: newOrder.id,
      productId,
      size,
      quantity
    }));

    console.log('orderProducts', orderProducts)

    await OrderProduct.bulkCreate(orderProducts);


    for (let { productId, size, quantity } of products) {
      const product = await Product.findByPk(productId);

      // Update the sizes array to reduce the quantity of the specified size
      const updatedSizes = product.sizes.map(s => {
        if (s.size === size) {
          return {
            ...s,
            quantity: s.quantity - quantity // Decrease by the quantity ordered
          };
        }
        return s;
      });

      // Save the updated product
      await product.update({ sizes: updatedSizes });
    }






    // Respond with the created order
    res.status(201).json({ order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
}

async function getAllOrders(req, res) {
  try {


    const orderProducts = await OrderProduct.findAll({
      include: [
        {
          model: Product,
          attributes: ['name'],
        },
        {
          model: Order,
        },
      ]
    })
    console.log('orders', orderProducts)
    const orders = orderProducts.reduce((acc, item) => {
      // Find the order in the accumulator
      let existingOrder = acc.find(order => order.orderId === item.orderId);

      if (!existingOrder) {

        existingOrder = {
          orderId: item.orderId,
          firstName: item.Order.firstName,
          lastName: item.Order.lastName,
          email: item.Order.email,
          phoneNumber: item.Order.phoneNumber,
          address: `${item.Order.governorate}, ${item.Order.address}, ${item.Order.postalCode}`,
          products: [],
        };
        acc.push(existingOrder);
      }

      // Add the product to the existing order
      existingOrder.products.push({
        name: item.Product.name,
        size: item.size,
      });

      return acc;
    }, []);




    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}


async function countOrders(req, res) {
  try {

    const orderCount = await Order.count();
    res.status(200).json({ count: orderCount });
  } catch (error) {
    console.error('Error counting products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const emailOrder = async (req,res) => {
  try {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
      auth: {
        
        user: "nada.ghribi203@gmail.com",
        pass: "bngo zjir gipn anjy"
    }
    });
    const mailOptions = {
      from: "nada.ghribi203@gmail.com",
      to: "stylisimo24@gmail.com",
      subject: "Order Confirmation",
      text:`Dear customer ,

Thank you for your order !

We're excited to let you know that your order has been successfully placed and is now being processed.

We'll notify you once your order is shipped. If you have any questions, feel free to contact us.

Thank you for shopping with STYLISIMO!

Best regards,
The STYLISIMO Team`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ error: 'Failed to send email' });
  }
 }

 



module.exports = { listGovernorates, createOrder, getAllOrders, countOrders,emailOrder}
