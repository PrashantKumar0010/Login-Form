const express = require('express')
const router = express.Router()
const { GetHomePageHandler, RegistrationPageHandler, RegisterUserHandler, LoginPageHandler, LoginUserHandler, showCourseHandler, ContactPageHandler, SendMessageHandler, SendEmailHandler } = require('../controller')
const { authenticate } = require('../authentication/auth')
// const { storeLoginData } = require('../middleware/log')
router.get('/', GetHomePageHandler)
router.get('/course',authenticate, showCourseHandler)
router.get('/registration',RegistrationPageHandler)
router.post('/registration', RegisterUserHandler)
router.get('/login', LoginPageHandler)
router.get('/contact', ContactPageHandler)
router.post('/login', LoginUserHandler)
router.post('/contact', SendMessageHandler)
router.post('/SendEmail', SendEmailHandler)


module.exports = router
