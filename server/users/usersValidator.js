const usersRepository = require('./usersRepository');
const step1Validator = async (step1Data) => {
    let errors = [];
    const { id, email, password, confirmPassword } = step1Data;
    if (!id) {
        errors.push('Id is missing');
    }
    else {
        let userId = await usersRepository.findOne({id: id});
        if (userId) {
            errors.push('User already exist');
            return errors;
        }
    }
    if(!password) {
        errors.push('Password is missing');
    }
    if (password !== confirmPassword) {
        errors.push('Please confirm password again');
    }
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
        errors.push('Email is incorrect');
    }
    return errors;
}

const step2Validator = async (userData) => {
    let errors = [];
    const { firstName, secondName, city, street } = userData;
    if (!userData.name.first) {
        errors.push('First Name is missing');
    }
    if(!userData.name.second) {
        errors.push('Second Name is missing');
    }
    if (!userData.address.city) {
        errors.push('City is missing');
    }
    if (!userData.address.street) {
        errors.push('Street is missing');
    }
    
    return errors;
}
module.exports = {step1Validator, step2Validator};