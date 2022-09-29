import { Contents } from './styled';
import Card from '../../atom/Card';
import Container from '../../atom/Container';

import diary from '../../../assets/notepad.png';
import record from '../../../assets/record.png';
import analysis from '../../../assets/analysis.png';
import food from '../../../assets/food.png';
import question from '../../../assets/q&a.png';
import { DiaryTitle } from '../Record/styled';
import { Name } from '../../atom/Card/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { authActions } from '../../../store/auth-slice';

let init = true;

function Home() {
    const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
        if (init) {
            init = false;
            return;
        } else {
            if (isLoggedIn) {
                return;
            }
            axios
                .post(
                    'https://nuseum-v2.herokuapp.com/api/v1/account/token/refresh/',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxLCJpYXQiOjEsImp0aSI6ImFjZTcxMzE5YmVkMDQwYzFhMWMxODgyNGYzOWUzNTVlIiwidXNlcl9pZCI6MH0.P1e_v6fDHgG4qaODzLDvKTFgGBBNK7pmH_9M--MpfwA`,
                        },
                    }
                )
                .then((response) => {
                    console.log('response: ', response.data);
                    const decodedData = jwt_decode(response.data.access);
                    dispatch(
                        authActions.login({
                            token: response.data.access,
                            expiration_time: decodedData.exp,
                        })
                    );
                })
                .catch((err) => {
                    // 리프레시토큰 만료
                    if (
                        err.response.data.messages[0].token_type === 'refresh'
                    ) {
                        alert('세션이 만료되었습니다. 다시 로그인해주세요!');
                        dispatch(authActions.logout());
                        navigate('/login');
                    }
                    if (err.response.data.err_code === 'NOT_ACCEPTABLE') {
                        dispatch(authActions.logout());
                        navigate('/login');
                    }
                    if (err.response.data.detail === 'Token is blacklisted') {
                        dispatch(authActions.logout());
                        alert(
                            '다른 곳에서 해당 계정으로 로그인하였습니다. 다시 로그인해주세요!'
                        );
                        navigate('/login');
                    }
                });
            init = true;
        }
    }, [dispatch]);

    const menu = [
        [diary, '식단일기', 'diary'],
        [analysis, '식이분석', 'analysis'],
        [food, '맞춤식품', 'food'],
        [record, '내 아이', 'record'],
        [question, 'Q&A', 'question'],
    ];

    return (
        <Container>
            <Contents style={{ height: '500px' }}>
                <DiaryTitle layoutId={menu[0][2]}>
                    <Name
                        style={{
                            width: '250px',
                            textAlign: 'center',
                            fontSize: '16px',
                        }}
                    >
                        맞춤형 영양관리 및 정보제공 연구
                    </Name>
                </DiaryTitle>
                <Card menu={menu} current='home' />
            </Contents>
        </Container>
    );
}

export default Home;
