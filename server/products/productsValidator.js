const validator = data => {
    const { name, price, category, img } = data;
    let errors = [];
    if (!name) {
        errors.push('Name is missing');
    }
    if (!price) {
        errors.push('Price is missing');
    }
    if (!category) {
        errors.push('Category is missing');
    }
    if (!img) {
        errors.push('Image is missing');
    }
    return errors;
}

module.exports = { validator };