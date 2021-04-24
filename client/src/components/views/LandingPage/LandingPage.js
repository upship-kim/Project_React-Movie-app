import React, {useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
function LandingPage(props) {
    useEffect(() => {
        //LandingPage가 실행되자마자 실행되는 기능
        axios
            .get('/api/hello') //server단에 route 발생 시킨다.
            .then((response) => console.log(response)); //res가 오면 콘솔로 res의 data를 출력시킨다.
    }, []);

    const logout = () => {
        axios.get('/api/users/logout').then((response) => {
            if (response.data.success) {
                props.history.push('/login');
                console.log('로그아웃 성공');
            } else console.log('error');
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                flexDirection: 'column',
            }}
        >
            <h2>시작페이지</h2>
            <button onClick={logout}>로그아웃</button>
        </div>
    );
}

export default withRouter(LandingPage);
