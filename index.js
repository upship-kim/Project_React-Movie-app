const express = require('express')  //express 모듈을 가져오는 것(import) 
const app = express() //위에서 만들어진 펑션을 통해 새로운 app을 만듦
const port = 5000 // 사용자 지정 포트 

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://upship:1234@cluster0.tdtsa.mongodb.net/test?retryWrites=true&w=majority', { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log("mongoDB Connected..")) //몽고 디비 연결 성공시 콘솔 출력 
.catch(err => console.log(err)) // 에러시 콘솔 출력 


app.get('/', (req, res) => {    //JavaScript ES6 표기법 (화살표 함수) 
  res.send('Hello World!')  
})

app.listen(port, () => {    //5000번 port 에서 이 어플케이션을 실행 하는 것 
  console.log(`Example app listening at http://localhost:${port}`)
})