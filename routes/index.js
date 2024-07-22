const express = require('express')
const router = express.Router()
const {GetHomePageHandler, RegistrationPageHandler, RegisterUserHandler, LoginPageHandler, LoginUserHandler, showCourseHandler, ContactPageHandler, SendMessageHandler} = require('../controller')
// const { GetLogHandler } = require('../middleware/log')
router.get('/', GetHomePageHandler)
router.get('/course', showCourseHandler)
router.get('/registration', RegistrationPageHandler)
router.post('/registration', RegisterUserHandler)
router.get('/login', LoginPageHandler)
router.get('/contact', ContactPageHandler)
router.post('/login', LoginUserHandler)
router.post('/contact', SendMessageHandler)


module.exports = router
