const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

// Define the schema for User or Message (depending on your context)
const messageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [100, 'Name must be less than 100 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: (props) => `${props.value} is not a valid email!`
        }
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        minlength: [10, 'Message must be at least 10 characters long'],
        maxlength: [500, 'Message must be less than 500 characters long']
    }
}, { timestamps: true });

// Create the model from the schema
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
