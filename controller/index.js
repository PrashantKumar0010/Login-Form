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
        res.render('registration-success', {
            user: {
                FirstName: newUser.FirstName,
                LastName: newUser.FirstName,
                Gmail: newUser.Gmail,
                Mobile: newUser.Mobile,
            },
        });

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
            return res.status(401).render('invalid-email')
        }
        const IsMatch = await bcrypt.compare(UserPassword, username.Password)
        if (!IsMatch) {
            return res.status(401).render('invalid-password');
        }
        else {
            const Token = await username.generateToken()
            res.cookie('token', Token).render('login-success', {
                message: 'You have been successfully logged in. Redirecting to home page in 5 seconds... you now have access to the locked root'
            });

        }
    } catch (error) {
        const { status, message } = handleError(error);
        console.log("Internal error: ", message);
        res.send({ status, message });
    }
}

// update code 

// async function LoginUserHandler(req, res) {
//     try {
//         const { Gmail, Password } = req.body;

//         // Find the user by email
//         const user = await person.findOne({ Gmail });
//         if (!user) {
//             return res.status(401).send({ error: 'Invalid Email' });
//         }

//         // Check if the password matches
//         const isMatch = await bcrypt.compare(Password, user.Password);
//         if (!isMatch) {
//             return res.status(401).send({ error: 'Invalid Password' });
//         }

//         // Generate a token
//         const token = await user.generateToken();

//         // Set the token in a cookie and redirect
//         res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
//             .redirect('/');
//     } catch (error) {
//         console.error('Internal error:', error);
//         res.status(500).send({ error: 'Internal Server Error' });
//     }
// }
// for login 




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
        res.send({ status, message });
    }
};
async function SendEmailHandler(req, res) {
    try {
        const { email } = req.body;
        console.log("sending email to ", email);
        res.send({ email });
    } catch (error) {
        console.log("Internal error: ", error);
        const { status, message } = handleError(error);
        res.send({ status, message });
    }
}
module.exports = {
    GetHomePageHandler,
    RegistrationPageHandler,
    RegisterUserHandler,
    LoginPageHandler,
    LoginUserHandler,
    showCourseHandler,
    ContactPageHandler,
    SendMessageHandler,
    SendEmailHandler,
};
