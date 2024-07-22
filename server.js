const express = require('express')
const jwt = require('jsonwebtoken')
const DB = require('./connection/db')
const login = require('./routes/index.js')
const cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser())
const path = require('path');
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))
app.use(express.static('./public'));

app.use('/', login)
const PORT = process.env.PORT || 3000
app.listen(PORT, (req, res) => {
    console.log('Server is running on port 3000')
})
