const mongoose = require('mongoose');
require('../database/index')
const contact = new mongoose.Schema(
    {
        name:{
            type: String,
        },
        phone:{
            type: String,
            unique: true,
        },
        image_url: {
            type: String,
            lowercase: true
        }
    }
);
const Contact = mongoose.model('contacts', contact)
module.exports = Contact;