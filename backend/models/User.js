const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    frstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    sex:{
        type: String,
        required: true,
        trim: true
    },
    DOB: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true
    }
    


});

const User = mongoose.model('user', userSchema);

module.exports = User;
