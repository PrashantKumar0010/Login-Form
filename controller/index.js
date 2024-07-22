const person = require('../models/person');
const Message = require('../models/contact');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { handleError } = require('../error/error')
async function GetHomePageHandler(req, res) {
    try {
        res.render('home');
    } catch (error) {
        console.log("Internal error: ", error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}
async function showCourseHandler(req, res) {
    try {
        res.render('course')
    } catch (error) {
        console.log("Internal error: ", error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}
async function RegistrationPageHandler(req, res) {
    try {
        res.render('registration');
    } catch (error) {
        console.log("Internal error: ", error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function RegisterUserHandler(req, res) {
    try {
        const { FirstName, Gmail, Mobile, Password, ConfirmPassword } = req.body;

        // Check for missing fields
        if (!FirstName || !Gmail || !Mobile || !Password || !ConfirmPassword) {
            return res.status(400).send({ error: 'All fields are required' });
        }
        // Check if passwords match
        if (Password !== ConfirmPassword) {
            return res.status(400).send({ error: 'Passwords do not match' });
        }
        const newUser = await person.create({
            FirstName,
            Gmail,
            Mobile,
            Password,
            ConfirmPassword
        })
        const token = await newUser.generateToken()
        console.log(token);
        res.status(201).send({ data: newUser });
    } catch (error) {
        const { status, message } = handleError(error);
        res.send({ status, message });
    }
}



async function LoginPageHandler(req, res) {
    try {
        res.render('login')
    } catch (error) {

    }
}

async function LoginUserHandler(req, res) {
    try {
        const UserGmail = req.body.Gmail
        const UserPassword = req.body.Password
        const username = await person.findOne({ Gmail: UserGmail })
        if (!username) {
            return res.status(401).send({ error: 'Invalid Email' });
        }
        const IsMatch = await bcrypt.compare(UserPassword, username.Password)
        if (!IsMatch) {
            return res.status(401).send({ error: 'Invalid Password' });
        }
        else {
            const Token = await username.generateToken()
            console.log("token", Token)
            res.cookie('token', Token).redirect('/')

        }
    } catch (error) {
        const { status, message } = handleError(error);
        console.log("Internal error: ", message);
        res.send({ status, message });
    }
}
async function ContactPageHandler(req, res) {
    try {
        res.render('contact')
    } catch (error) {
        console.log("Internal error: ", error);
        res.status(500).send({ error: 'Internal server error' });
    }
 
}
const SendMessageHandler = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log(" sending message to ", name, email, message);

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new message instance
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        // Respond with success
        res.status(201).json({ message: 'Message created successfully', data: newMessage });
    } catch (error) {
        const { status, message } = handleError(error);
        console.log(" error: ", status, message);
        console.log("Internal error: ", message);
        res.send({ status, message });
    }
};
module.exports = {
    GetHomePageHandler,
    RegistrationPageHandler,
    RegisterUserHandler,
    LoginPageHandler,
    LoginUserHandler,
    showCourseHandler,
    ContactPageHandler,
    SendMessageHandler,
};
