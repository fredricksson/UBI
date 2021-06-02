const mongoose = require('mongoose');
const keys = require('../keys.js');

mongoose.connect(keys.mongoDB.dbURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
mongoose.Promise = global.Promise

module.exports = mongoose;