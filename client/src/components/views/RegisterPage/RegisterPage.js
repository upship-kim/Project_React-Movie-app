import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';
function RegisterPage(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const onEmailHandler = (e) => {
        setEmail(e.target.value);
    };
    const onNameHandler = (e) => {
        setName(e.target.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
    };
    const onPasswordConfirmHandler = (e) => {
        setPasswordConfirm(e.target.value);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            alert('입력한 비밀번호가 다릅니다');
            return;
        }

        const body = {
            email: email,
            name: name,
            password: password,
        };

        dispatch(registerUser(body)).then((response) => {
            if (response.payload.success) {
                props.history.push('/login');
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
                <label>Name</label>
                <input type="name" value={name} onChange={onNameHandler} />
                <label>Password</label>
                <input
                    type="Password"
                    value={password}
                    onChange={onPasswordHandler}
                />
                <label>Password Confirm</label>
                <input
                    type="password"
                    value={passwordConfirm}
                    onChange={onPasswordConfirmHandler}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default withRouter(RegisterPage);
