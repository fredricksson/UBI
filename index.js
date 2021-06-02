const express = require('express');
const contactsRoutes = require('./routes/index');

const app = express();
const cors = require('cors')
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());
app.use(cors())
app.use('/contacts',contactsRoutes)
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const PORT = process.env.PORT || 2222;
app.listen(PORT);