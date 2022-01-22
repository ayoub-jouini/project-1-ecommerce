const express = require('express');
const { check } = require('express-validator');

const productsControllers = require('../controllers/products-controllers');
const checkAuth = require('../middleware/check-auth');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', productsControllers.getAllProducts);

router.get('/bestProducts', productsControllers.getBestProducts);

router.get("/newproducts", productsControllers.getNewProducts);

router.get('/:category', productsControllers.getProductsByCategory);

router.get('/:category/:id', productsControllers.getProductById);

router.use(checkAuth);

router.post('/',
    fileUpload.single('image'),
    [check('productName').not().isEmpty(),
    check('productCategory').not().isEmpty(),
    check('price').not().isEmpty()],
    productsControllers.postProduct);

router.patch('/:category/:id',
    fileUpload.single('image'), [
    check('productName').not().isEmpty(),
    check('price').not().isEmpty()],
    productsControllers.updateProduct);

router.delete('/:category/:id', productsControllers.deleteProduct);

module.exports = router;