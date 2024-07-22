// model/userLogin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long']
    },
    Gmail: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: (props) => `${props.value} is not a valid email!`
        }
    },
    Mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        trim: true,
        match: [/^\d{10}$/, 'Please enter a valid mobile number']
    },
    Password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        trim: true
    },
    ConfirmPassword: {
        type: String,
        required: [true, 'Confirm password is required'],
    },
}, { timestamps: true });

userSchema.methods.generateToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString(), Gmail: this.Gmail.toString() }, process.env.SECRET_KEY)
        return token
    } catch (error) {
        console.log('error', error)
    }
}
// Hashing password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('Password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    this.ConfirmPassword = await bcrypt.hash(this.ConfirmPassword, salt)
    next();
})


module.exports = mongoose.model('Person', userSchema);