const ordersRepository = require('./ordersRepository');

const validator = async data => {
    const { city, street, creditCard, date } = data;
    let errors = [];
    if (!city) { // city validate
        errors.push('City is missing');
    }
    if (!street) { // street validate
        errors.push('Street is missing');
    }

    if (!creditCard) { // credit card validate
        errors.push('Credit card is missing');
    }
    else {
        const regex = /4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11}/
        if (!regex.test(creditCard)) {
            errors.push('Credit Card is incorrect');
        }
    }

    if (!date) { // date validate
        errors.push('Date is missing');
    }
    else {
        const list = await ordersRepository.find({deliveryDate: date});
        if (list.length >= 3) {
            errors.push('We can not deliver your order at this date. Please, choose another day.');
        }
    }
    return errors;
}

module.exports = {validator};