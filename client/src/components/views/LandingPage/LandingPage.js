import React, { useEffect } from 'react';
import axios from 'axios'; 



function LandingPage() {

    useEffect(() => { //LandingPage가 실행되자마자 실행되는 기능 
        axios.get('/api/hello')
        .then(response =>console.log(response.data));
    }, [])

    return (
        <div>
            LandingPage 랜딩 페이지
        </div>
    )
}

export default LandingPage
