const express = require('express');
const { check } = require('express-validator');

const orderControllers = require('../controllers/order-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/',
    check('userName').not().isEmpty(),
    check('useEmail').not().isEmpty(),
    check('userEmail').isEmail(),
    check('userPhoneNumber').not().isEmpty(),
    check('userPhoneNumber').isNumeric(),
    check('userAdress').not().isEmpty()
    , orderControllers.postOrder);

router.use(checkAuth);

router.get('/', orderControllers.getAllOrders);

router.get('/:id', orderControllers.getOrderById);

router.delete('/:id', orderControllers.deleteOrder);

router.patch('/:id', orderControllers.updateOrderState);

module.exports = router;