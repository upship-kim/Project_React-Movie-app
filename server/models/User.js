const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

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
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err); //error가 발생하였을 때 next 펑션을 사용하여 err문도 함께 보낸다 
            
            //salt를 제대로 생성을 했다면 
            bcrypt.hash(user.password, salt, function(err, hash){ //hash(plainPassword, Salt, function(err, hash)
                if(err) return next(err);
                
                user.password = hash;   //plainPassword를 hash된 비밀번호로 바꿔주는 것 
                next()  //pre 함수니까 next가 save인격 
            })
        })
    } else{
        next();
    }

})

//userSchema 내 checkPassword 메소드 생성
userSchema.methods.checkPassword = function(plainPassword, callback){
    //여기서 bcrypt 라이브러리 메소드를 사용함
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return callback(err);
        //비밀번호가 맞다면 err자리에 null, isMatch = true
        callback(null, isMatch);
    })
}

//userSchema내 메소드 createToken 생성
userSchema.methods.createToken = function(callback){
    var user = this;        //ES5 문법이니 변수를 생성해줘야함 
    
    // json web token 을 이용해서  token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')  //_는 private 같은 네이밍룰이다 
    //user._id + 'secretToken' 해서 token을 만드는 것 
    // 추후 토큰을 해석할때 'secretToken'을 넣으면 user._id가 나오는 것 

    //스키마에 위 토큰을 넣어주기
    user.token = token;

    user.save(function(err, user){
        if(err) return callback(err);
        callback(null, user);   // 해석: 콜백에 error는 null이고 user 정보만 있는 것 
    })

}

userSchema.statics.findByToken = function(token, callback){
    var user = this;

    jwt.verify(token, 'secretToken', function (err, decoded){
        console.log("decoded", decoded);
        //유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 token과 DB에 저장된 token이 일치하는지 확인 
        user.findOne({ "_id": decoded, "token": token }, (err, user) => {
            //만약 에러가 있다면
            if(err) return callback(err); 
            //만약 에러가 없다면 
            callback(null, user);
        })
        
    })
}



const User = mongoose.model('User', userSchema) //모델에 userSchema를 감싸는 것  (모델의 이름, 스키마)

module.exports = { User } //다른곳에도 쓸 수 있게 함 


