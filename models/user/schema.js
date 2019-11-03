const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'why no name?'],
        trim: true,
    },
    email: {
        minlength: 1,
        unique: true,
        type: String,
        required: [true, 'You have to provide'],
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0) {
                throw new Error('Age must be positive')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.includes('password')){
                throw new Error('Can\'t use the word password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
    house: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'House',
    }
}, {
    timestamps: true,
});

module.exports = { schema };