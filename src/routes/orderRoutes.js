const express = require('express');
const {listGovernorates,createOrder,getAllOrders,countOrders,emailOrder} = require('../controllers/orderController');
const router = express.Router();

router.get('/governorates',listGovernorates)
router.post('/order',createOrder)
router.get('/orders',getAllOrders)
router.get('/ordersCount',countOrders)
router.post('/send-email', emailOrder);


module.exports = router;