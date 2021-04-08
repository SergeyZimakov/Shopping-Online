const ordersRouter = require('express').Router();
const ordersRepository = require('./ordersRepository');

ordersRouter.get('/totalamount', async (req, res) => {
    try {
        const list = await ordersRepository.find();
        res.json({amount: list.length});
    } catch (err) {
        res.status(404).json({err});
    }
})

module.exports = ordersRouter;