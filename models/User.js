const mongoose = require('mongoose');
const bcriypt = require('bcrypt');
const saltRounds = 10; 


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

//user모델에 user 정보를 저장하기 전에 function이 진행되는 것 
userSchema.pre('save', function(next){
    var user = this; //user schema body를 가르킴 
    //비밀번호를 암호화 시킨다

    //비밀번호만 바꿀때 아래 코드를 실행한다(조건식 부여)
    if(user.isModified('password')){    //비밀번호가 바뀌었을때만 ! 

        
        //bcrypt 홈페이지에서 사용 코드를 가져옴 
        bcriypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err); //error가 발생하였을 때 next 펑션을 사용하여 err문도 함께 보낸다 
            
            //salt를 제대로 생성을 했다면 
            bcriypt.hash(user.password, salt, function(err, hash){ //hash(plainPassword, Salt, function(err, hash)
                if(err) return next(err);
                
                user.password = hash;   //plainPassword를 hash된 비밀번호로 바꿔주는 것 
                next()  //pre 함수니까 next가 save인격 
            })
        })
    } else{
        next();
    }


})

const User = mongoose.model('User', userSchema) //모델에 userSchema를 감싸는 것  (모델의 이름, 스키마)

module.exports = { User } //다른곳에도 쓸 수 있게 함 


