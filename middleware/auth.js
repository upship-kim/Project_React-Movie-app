const { json } = require('body-parser');
const { User } = require('../models/User');

//index.js 내 auth route에서 auth를 변수화해서 parameter에 사용 했으므로 처리되면 다음으로 진행되는 next 콜백 값을 넣어준다. 

//auth fucntion 정의 
let auth = (req, res, next) => {

    //인증 처리를 하는 곳 
    // 단계1. 클라이언트 쿠키에서 token을 가져온다 
    let token = req.cookie.x_auth;

    // 단계2. 가져온 클라이언트 token을 복호화하여 DB내에서 유저를 찾는다.
    //  그러기 위해서 userSchema 내에서 메소드를 만들어 진행한다. 
    User.findByToken(token, (err, user) => {
        //에러가 있으면 에러를 던져주고 
        if(err) throw err; 
        // 단계2-1. 유저가 없으면 인증 실패 
        if(!user) return res.json({"isAuth":false, error: true});
    
        // 단계2-2. 유저가 있으면 인증 완료 
        // req.token 과 req.user 를 해주는 이유는 index.js 내 auth route req파라미터에 이 값을 넣어주는 것 
        req.token = token; 
        req.user = user; 
        next(); //next를 해주어야 index.js 내 auth route에서 다음 파라미터 값으로 넘어간다. 안하면 auth에서 맴돌게 된다. 

    })
}

module.exports = { auth };  