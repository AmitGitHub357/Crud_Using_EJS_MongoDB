var mongoose = require('mongoose');

var newSchema = mongoose.Schema(
    {
        userName : String,
        email : String,
        phone : Number,
        status : String,
        gender : String
    }
)

module.exports = mongoose.model( 'users',newSchema );