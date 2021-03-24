const MyEntityModel = require('./model/myModel');
const MyEntity = require('./model/myModel');
const router = require('express').Router();

router.use('/admin', require('./adminsRouter'));
router.use('/customer', require('./customersRouter'));
router.use('/users', require('./users/usersRouter'));
router.use('/products', require('./products/productsRouter'));
// apiRouter.get('/', async (req, res) => {
//   try {
//     const list = await MyEntity.find();
//     console.log(list.length);
//     res.json(list);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

// apiRouter.post('/', (req, res) => {
//   try {

//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

module.exports = router;
