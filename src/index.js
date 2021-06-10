const express = require('express')
const app = express()
const cors = require('cors')
const contactRoutes = require('./routes/contactRoutes')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('/contacts', contactRoutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log('locahost:3000');
})