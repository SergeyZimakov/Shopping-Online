const usersRouter = require('express').Router();
const usersRepository = require('./usersRepository');
const usersValidator = require('./usersValidator');
const bcrypt = require('bcrypt');

usersRouter.post('/register/step1', async (req, res) => {
    const step1Data = req.body;
    try {
        const errors = await usersValidator.step1Validator(step1Data);
        res.status(200).send(errors);
    } catch (err) {
        res.status(400).send(['Something went wrong']);
    }
    
});

usersRouter.post('/register/step2', async (req, res) => {
    const newUserData = req.body;
    try {
        const errors = await usersValidator.step2Validator(newUserData);
        if (errors.length > 0) {
            res.send(errors);
        }
        else {
            newUserData.role = 'customer';
            newUserData.carts = [];
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            const i = await usersRepository.create(newUserData);
            res.send(['User successfuly registered']);
        }
    } catch (err) {
        res.status(400).send(['Something went wrong']);
    }
    
});


module.exports = usersRouter;