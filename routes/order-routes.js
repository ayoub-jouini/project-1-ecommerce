const express = require('express');

const orderControllers = require('../controllers/order-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/', orderControllers.postOrder);

router.use(checkAuth);

router.get('/', orderControllers.getAllOrders);

router.get('/:id', orderControllers.getOrderById);

router.delete('/:id', orderControllers.deleteOrder);

router.patch('/:id', orderControllers.updateOrderState);

module.exports = router;