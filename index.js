const express = require('express');  //express 모듈을 가져오는 것(import) 
const app = express(); //위에서 만들어진 펑션을 통해 새로운 app을 만듦
const port = 5000 // 사용자 지정 포트 
const { User } = require("./models/User"); //User.js의 경로를 지정 하여 모델을 가져옴
const bodyParser = require('body-parser');
const config = require('./config/key'); //key.js를 상수로 지정한다 

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {     //key.js에 있는 내용을 가져온다
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log("mongoDB Connected..")) //몽고 디비 연결 성공시 콘솔 출력 
.catch(err => console.log(err)) // 에러시 콘솔 출력 

app.get('/', (req, res) => {    //JavaScript ES6 표기법 (화살표 함수) 
  res.send('Hello World! 뚱이 안녕 !')  
})

//body-parser 의 옵션을 지정
app.use(bodyParser.urlencoded({extended: true})); //bodyparser가 application/x-www-form-urlencoded 분석 해서 가져옴
app.use(bodyParser.json()); //bodyparser가 application/json 을 분석해서 가져옴

//postMan을 활용하여 데이터 흐름 확인
app.post('/register', (req, res) => {
  //회원가입에 필요한 정보들을 client 단에서 가져오면 데이터베이스에 넣어준다.
  //그러기 위해서는 User.js 에서 만들어둔 모델을 가져와야함 
  

  const user = new User(req.body) //req.body 안에는 json형태로 name: 값 이런식으로 들어가있는 것 -> 이것을 가져오게 하는게 body Parser

  //User.js내 몽고db 메소드를 이용 하여 데이터베이스에 저장
  user.save((err, userInfo) => {
    if(err) return res.json({ success : false, err})  //에러가 발생할 시, success : false를 전달하고 err메시지도 함께 전달
    return res.status(200).json({ //성공 시 (status 200 이 성공할 떄임 ) 제이슨 형식으로 success true를 반환
      success: true
    })
  })
})


//로그인 기능
app.post('/login', (req, res) => {
  //mongoDB에서 제공하는 fineOne 메소드를 이용하여 메일 주소 찾기 
  User.findOne({email:req.body.email}, (err, userInfo) => {
    //등록된 메일주소가 없다면 
    if(!userInfo){
      return res.json ({
        success : false, 
        message : "등록된 메일주소가 없습니다"
      })
    } 

    //등록된 메일주소가 있다면 비밀번호도 맞는지 체크 
    user.checkPassword(req.password, (err, isMatch) =>{
      if(!isMatch) {
        return res.json({
          success : false, 
          message : "비밀번호가 틀립니다."
        })
      }
      // 맞다면 로그인 Token 생성 
    })
  })
})



app.listen(port, () => {    //5000번 port 에서 이 어플케이션을 실행 하는 것 
  console.log(`Example app listening at http://localhost:${port}`)
})