const usersRouter = require('express').Router();
const usersRepository = require('./usersRepository');
const usersValidator = require('./usersValidator');
const bcrypt = require('bcrypt');

usersRouter.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId === 'null') {
            res.send(['user not found']);
        }
        else {
            const user = await usersRepository.findById(userId);
            if (user) {
                delete user.password;
                res.send(user);
            }
            else {
            }
        }
    } catch(err) {
        console.log(err);
    }
});

usersRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await usersRepository.findOne({email: email});
    if (!user) {
        res.json({err: 'The email or password in incorrect'});
    }
    else {
        await bcrypt.compare(password, user.password, async (err, match) => {
            if (err) {
                res.json({err});
            }
            else {
                if (match) {
                    req.session.user = user;
                    res.cookie('userId', user._id.toString());
                    delete user.password;
                    res.json({user});
                }
                else {
                    res.json({err: 'The email or password in incorrect'});
                }
            }
        })
    }

});

usersRouter.post('/logout', (req, res) => {
    if(req.session && req.session.user) {
        req.session.user = null;
        res.clearCookie('userId');
        res.clearCookie('cartId');
        res.status(200).send(['User logged out']);
    }
    else {
        res.clearCookie('userId');
        res.clearCookie('cartId');
        res.status(400).send(['User was not autorized']);
    }
});

usersRouter.post('/register/admin', async (req, res) => {
    try {
        const newUserData = req.body;
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        const newUser = await usersRepository.create(newUserData);
        newUser.save();
        req.session.user = newUser;
        res.cookie('userId', newUser._id.toString());
        res.json({msg: `User ${newUser._id.toString()} registered successfuly`});
    } catch (err) {
        res.status(400).json({err: 'Something went wrong'});
    }
});

usersRouter.post('/register/step1', async (req, res) => {
    try {
        const step1Data = req.body;
        const errors = await usersValidator.step1Validator(step1Data);
        res.status(200).json({validatorErrors: errors});
    } catch (err) {
        res.status(400).json({err: 'Something went wrong'});
    }    
});

usersRouter.post('/register/step2', async (req, res) => {
    try {
        const newUserData = req.body;
        const errors = await usersValidator.step2Validator(newUserData);
        if (errors.length > 0) {
            res.json({validatorErrors: errors});
        }
        else {
            newUserData.role = 'customer';
            newUserData.lastCartId = '';
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            const newUser = await usersRepository.create(newUserData);
            newUser.save();
            req.session.user = newUser;
            res.cookie('userId', newUser._id.toString());
            res.json({msg: `User ${newUser._id.toString()} registered successfuly`});
        }
    } catch (err) {
        res.status(400).json({err: 'Something went wrong'});
    }
});

module.exports = usersRouter;