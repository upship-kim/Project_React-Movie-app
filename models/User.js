const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 3
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number, 
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp:{
        type: Number
    }
})

const User = mongoose.model('User', userSchema) //모델에 userSchema를 감싸는 것  (모델의 이름, 스키마)

module.exports = { User } //다른곳에도 쓸 수 있게 함 