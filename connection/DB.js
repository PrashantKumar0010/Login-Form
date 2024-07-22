const mongoose = require('mongoose')
require('dotenv').config()
// const URL = process.env.lOCAL_CONNECTING_STRING
const URL = process.env.REMOTE_DATABASE_CONNECTING_STRING
mongoose.connect(URL).then((data) => {
    console.log("connected successfully:")
}).catch((err) => {
    console.log('something is wrong: ')
    throw err
})
const Db = mongoose.connection
 Db.on('connected', ()=> {
    console.log("we have successfully connected with mongoDbms Server")
})
 Db.on('disconnected', ()=> {
    console.log("Now we have  Disconnected with mongoDbms Server")
})
 Db.on('error', (err)=> {
    console.log("something is wrong to connect with mongoDbms Server", err)
})

module.exports = Db;