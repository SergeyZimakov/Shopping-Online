const router = require('express').Router();

router.use('/admin', require('./adminsRouter'));
router.use('/customer', require('./customersRouter'));
router.use('/users', require('./users/usersRouter'));
router.use('/products', require('./products/productsRouter'));
router.use('/orders', require('./orders/ordersRouter'));
router.use('/carts', require('./carts/cartsRouter'));


module.exports = router;