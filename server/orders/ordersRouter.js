const ordersRouter = require('express').Router();
const ordersRepository = require('./ordersRepository');
const cartsRepository = require('../carts/cartsRepository');
const usersRepository = require('../users/usersRepository');
const productsRepository = require('../products/productsRepository');
const ordersValidator = require('./ordersValidator');
const fs = require('fs').promises;

ordersRouter.get('/totalamount', async (req, res) => {
    try {
        const list = await ordersRepository.find();
        res.json({amount: list.length});
    } catch (err) {
        res.status(404).json({err});
    }
});

ordersRouter.get('/download/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await ordersRepository.findById(orderId);
        const filename = `${order._id.toString()}.txt`;
        const text = await createCheck(order.cartId, order.price);
        fs.writeFile(`invoices/${filename}`, text, () => {});
        res.attachment(filename);
        res.type('txt');
        res.send(text);
    } catch (err) {
        res.status(404).json({err});
    }
});

async function createCheck (cartId, price) {
    try {
        let text = '';
        const cart = await cartsRepository.findById(cartId);
        const items = cart.items;
        let products = [];
        for (i=0; i<items.length; i++) {
            products.push(items[i].productId);
        }
        console.log(products);
        for (i=0; i<products.length; i++) {
            const list = await productsRepository.findOne({products: {$elemMatch: {_id: products[i]}}});
            const product = list.products.find(p => p._id.toString() === products[i]);
            const productName = product.name;
            console.log(productName);
            text += `${product.name}.....${product.price}ILS\n`;
            console.log(text);
        }
        text += `Total price: ${price}ILS`;
        return text;
    }
    catch (err) {
        console.log(err);
    }
}

ordersRouter.post('/', async (req, res) => {
    try {
        const { userId, cartId, city, street, creditCard, date } = req.body;
        let errors = await ordersValidator.validator({city, street, date, creditCard});
        if (errors.length === 0) {
            const cart = await cartsRepository.findById(cartId);
            const price = cart.price;
            const orderDate = new Date().toLocaleDateString();
            const deliveryDate = date;
            const order = await ordersRepository.create({userId, cartId, deliveryDate, orderDate, address: {city, street}, price, creditCard});
            await cartsRepository.findByIdAndUpdate(cartId, {status: 'closed'});
            res.json({orderId: order._id.toString()});
        }
        else {
            res.json({errors});
        }
    } catch (err) {
        res.status(404).json({err});
    }
})

module.exports = ordersRouter;