const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    Title: String,
    Author: String,
    Price: Number,
    Description: String,
    ISBN: String

})



module.exports = mongoose.model('Book',bookSchema)