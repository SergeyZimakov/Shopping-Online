const router = require('express').Router();

router.use('/admin', require('./adminsRouter'));
router.use('/customer', require('./customersRouter'));
router.use('/users', require('./users/usersRouter'));
router.use('/products', require('./products/productsRouter'));

// router.get('/', (req, res) => {
//     res.cookie('userId', '');
//     res.send('hi');
// })

module.exports = router;
