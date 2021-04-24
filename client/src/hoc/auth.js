import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function (SpaciaificComponent, option, adminRoute = null) {
    // spaciaificComponent : page component
    // option : null => 아무나 출입이 가능한 페이지 / true => 로그인한 유저만 출입이 가능한 페이지 /  false => 로그인한 유저는 출입 불가
    // adminRoute : admin 유저만 들어갈 수 있는 페이지 (설정은 true로 )

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then((response) => {
                console.log(response);

                //로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    //option이 true인 페이지로 이동할 경우
                    if (option) {
                        props.history.push('/login');
                    }
                } else {
                    //로그인한 상태
                    if (adminRoute && !response.payload.isAuth) {
                        props.history.push('/');
                    } else {
                        if (option === false) {
                            props.history.push('/');
                        }
                    }
                }
            });
        }, []);

        return <SpaciaificComponent />;
    }

    return AuthenticationCheck;
}
