import React, { useEffect } from 'react';
import axios from 'axios'; 



function LandingPage() {

    useEffect(() => { //LandingPage가 실행되자마자 실행되는 기능 
        axios.get('/api/hello') //server단에 route 발생 시킨다. 
        .then(response =>console.log(response.data));   //res가 오면 콘솔로 res의 data를 출력시킨다. 
    }, [])

    return (
        <div>
            LandingPage 랜딩 페이지
        </div>
    )
}

export default LandingPage
