const cartsRouter = require('express').Router();
const cartsRepository = require('./cartsRepository');
const usersRepository = require('../users/usersRepository');
const productsRepository = require('../products/productsRepository');
const cartsUtils = require('./cartsUtils');

cartsRouter.get('/id/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await cartsRepository.findById(cartId);
        if (cart) {
            res.cookie('cartId', cart._id.toString());
            res.json({cart});
        } else {
            res.status(404).json({err: 'Error. Cart not found'});
        }
    } catch (err) {
        res.status(404).json({err});
    }
});
cartsRouter.get('/cartShortInfo/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await cartsRepository.findById(cartId);
        if (cart) {
            res.json({status: cart.status, price: cart.price, createdAt: cart.createdAt});
        } else {
            res.status(404).json({err: 'Error. Cart not found'});
        }
    } catch (err) {
        res.status(404).json({err});
    }
});

cartsRouter.post('/createNewCart', async (req, res) => {
    try {
        const { userId } = req.body;
        const newCart = await cartsRepository.create({userId});
        await usersRepository.findByIdAndUpdate(userId, {lastCartId: newCart._id.toString()});
        res.cookie('cartId', newCart._id.toString());
        res.json({cart: newCart});
    } catch (err) {
        res.status(404).json({err});
    }
});

cartsRouter.post('/addItem', async (req, res) => {
    try {
        const { cartId, quantity, productId } = req.body;
        const price = await cartsUtils.getPrice(productId);
        const cart = await cartsRepository.findById(cartId);
        cart.items.push({quantity, price, productId});
        await cart.save();
        const cartPrice = await cartsUtils.getCartPrice(cartId);
        await cartsRepository.findByIdAndUpdate(cartId, {price: cartPrice});
        res.json({msg: 'item added to cart'});
    } catch (err) {
        res.status(404).json({err});
    }
});

cartsRouter.delete('/deleteItem', async (req, res) => {
    try {
        const { cartId, itemId } = req.body;
        const cart = await cartsRepository.findById(cartId);
        const items = cart.items.filter(item => item._id.toString() !== itemId);
        cart.items = items;
        await cart.save();
        const cartPrice = await cartsUtils.getCartPrice(cartId);
        await cartsRepository.findByIdAndUpdate(cartId, {price: cartPrice});
        res.json('Item removed');
    } catch (err) {
        res.status(404).json({err});
    }
});
cartsRouter.delete('/clearCart', async (req, res) => {
    try {
        const { cartId } = req.body;
        const cart = await cartsRepository.findById(cartId);
        cart.items = [];
        await cart.save();
        const cartPrice = await cartsUtils.getCartPrice(cartId);
        await cartsRepository.findByIdAndUpdate(cartId, {price: cartPrice});
        res.json('All Items removed');
    } catch (err) {
        res.status(404).json({err});
    }
});


module.exports = cartsRouter;