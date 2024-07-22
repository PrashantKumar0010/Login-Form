const person = require('../models/person');
const mongoose = require('mongoose');

const handleError = (error) => {
    if (error instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(error.errors).map(val => val.message);
        return { status: 400, message: messages.join('. ') };
    } else if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        if (field === 'Gmail') {
            return { status: 400, message: 'Gmail already exists' };
        } else if (field === 'Mobile') {
            return { status: 400, message: 'Mobile already exists' };
        } else {
            return { status: 400, message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` };
        }
    } else {
        return { status: 500, message: 'Internal server error' };
    }
};
module.exports = {
    handleError,
}