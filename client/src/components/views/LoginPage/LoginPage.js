import axios from 'axios';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';
function LoginPage(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailHandler = (e) => {
        setEmail(e.target.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();

        const body = {
            email: email,
            password: password,
        };

        dispatch(loginUser(body)).then((response) => {
            if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                props.history.push('/');
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
            }}
        >
            <form
                style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler} //form 에다가 submit 핸들러를 넣어줘야한다 ! ! !!
            >
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>Password</label>
                <input
                    type="Password"
                    value={password}
                    onChange={onPasswordHandler}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default withRouter(LoginPage);
