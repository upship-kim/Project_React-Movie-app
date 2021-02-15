const express = require('express');  //express 모듈을 가져오는 것(import) 
const app = express(); //위에서 만들어진 펑션을 통해 새로운 app을 만듦
const port = 5000 // 사용자 지정 포트 
const { User } = require("./models/User"); //User.js의 경로를 지정 하여 모델을 가져옴
const bodyParser = require('body-parser');


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://upship:1234@cluster0.tdtsa.mongodb.net/test?retryWrites=true&w=majority', { 
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




app.listen(port, () => {    //5000번 port 에서 이 어플케이션을 실행 하는 것 
  console.log(`Example app listening at http://localhost:${port}`)
})