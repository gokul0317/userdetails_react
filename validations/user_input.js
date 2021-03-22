const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateUserInput = (data) => {
    var errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name is Required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
