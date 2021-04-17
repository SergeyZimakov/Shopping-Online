const productsRouter = require('express').Router();
const productsRepository = require('./productsRepository');
const productsValidator = require('./productsValidator');
const upload = require('../utils/uploadConfig');


productsRouter.get('/id/:id', async (req, res) => {
    try {
        const list = await productsRepository.findOne({products: {$elemMatch: {_id: req.params.id}}});
        const product = list.products.find(p => p._id.toString() === req.params.id);
        res.json(product);
    } catch (err) {
        res.status(404).json({err});
    }
});

productsRouter.get('/name/:name', async (req, res) => {
    try {
        let products = [];
        const list = await productsRepository.find();
        list.forEach( l => {
            l.products.forEach( p => {
                if (p.name.toLowerCase() === req.params.name.toLowerCase()) {
                    products.push(p);
                }
            })
        })
        res.json(products);
    } catch (err) {
        res.status(404).json({err});
    }
});

productsRouter.get('/category/:categoryName', async (req, res) => {
    const category = await productsRepository.findOne({categoryName: req.params.categoryName});
    if (!category) {
        res.status(404).send(['Category does not found']);
    }
    else {

    }
    res.status(200).send(category.products);
});

productsRouter.get('/totalamount', async (req, res) => {
    try {
        let amount = 0;
        let list = await productsRepository.find();
        list.forEach(l => amount += l.products.length)
        res.json({amount});
    } catch (err) {
        res.status(404).json({err});
    }
});

productsRouter.get('/categorieslist/', async (req, res) => {
    try {
        let list = [];
        const categories = await productsRepository.find();
        categories.forEach( c => list.push(c.categoryName));
        res.status(200).send(list);
    } catch (error) {
        res.status(404).send([error]);
    }
});

productsRouter.post('/', upload.single("image"), async (req, res) => {
    try {
        const {name, price, category} = req.body;
        const img = req.file.filename;
        const imgPath = req.file.path;
        const errors = productsValidator.validator({name, price, category, img});
        if (errors.length > 0) {
            res.json({errors});
        }
        else {
            let categoryFromDb = await productsRepository.findOne({categoryName: category});
            if (!categoryFromDb) {
                categoryFromDb = await productsRepository.create({categoryName: category, products: []});
            }
            const newProductData = {
                name,
                price: parseFloat(price),
                img
            }
            categoryFromDb.products.push(newProductData);
            categoryFromDb.save();
            res.json({msg: 'Product successfully added to db'});
        }
    } catch (err) {
        res.status(400).json({err});
    }
})

productsRouter.post('/update/:productId', async (req, res) => {
    try {
        const {name, price} = req.body;
        console.log({name, price});
        const list = await productsRepository.findOne({products: {$elemMatch: {_id: req.params.productId}}});
        let product = list.products.find(p => p._id.toString() === req.params.productId);
        if (name) {
            product.name = name;
        }
        if (price) {
            product.price = parseFloat(price);
        }
        await list.save();
        console.log(list);
        res.json('Updated successfully');
    } catch (err) {
        res.status(400).json({err});
    }
})

module.exports = productsRouter;