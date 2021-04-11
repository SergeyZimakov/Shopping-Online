const cartsRepository = require('./cartsRepository');
const usersRepository = require('../users/usersRepository');
const productsRepository = require('../products/productsRepository');

const getPrice = async (productId) => {
    try {
        const list = await productsRepository.findOne({products: {$elemMatch: {_id: productId}}});
        const product = list.products.find(p => p._id.toString() === productId);
        return product.price;
    }
    catch (err) {
        console.log(err);
    }
        
};

const ifExist = async (cartId, productId) => {
    try {
        let flag = false;
        const cart = await cartsRepository.findById(cartId);
        cart.items.forEach(item => {
            console.log(item.productId);
            console.log(productId);
            if (item.productId == productId) {
                flag = true;
            }
        });
        return flag;
    } catch (err) {
        console.log(err);
    }
}

const updateItem = async (data) => {
    try {
        const { cartId, quantity, price, productId } = data;
        const cart = await cartsRepository.findById(cartId);
        cart.items.forEach((item) => {
            if (item.productId === productId) {
                item.quantity = item.quantity + quantity;
                item.price = item.price + price;
                cart.save();
            }
        });
    } catch (err) {
        console.log(err);
    }
}
const getCartPrice = async (cartId) => {
    try {
        const cart = await cartsRepository.findById(cartId);
        let cartPrice = 0;
        for (let index = 0; index < cart.items.length; index++) {
            const item = cart.items[index];
            cartPrice += item.price;
        }
        return cartPrice;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {getPrice, ifExist, updateItem, getCartPrice};