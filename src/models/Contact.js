const mongoose = require('../database')
const ContactSchema = new mongoose.Schema({
    name:{
            type: String,
            required: true,
        },
        phone:{
            type: String,
            unique: true,
            required: true
        },
        image_url: {
            type: String,
            default: "http://via.placeholder.com/300"
        }
})
const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact