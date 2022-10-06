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
import { useDispatch } from 'react-redux';

import { authActions } from '../../../store/auth-slice';
import handleExpired from '../../../helpers/handleExpired';

let init = true;

function Home() {
    const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        fetchTokenInHome();
    }, [dispatch]);
    const fetchTokenInHome = async () => {
        const { exp, token } = await handleExpired();
        dispatch(
            authActions.login({
                token: token.data.access,
                exp,
            })
        );
    };
    const menu = [
        [diary, '식단일기', 'diary'],
        [analysis, '식이분석', 'analysis'],
        [food, '맞춤식품', 'food'],
        [record, '내 아이', 'record'],
        [question, 'Q&A', 'question'],
    ];

    return (
        <Container>
            <Contents style={{}}>
                <DiaryTitle layoutId={menu[0][2]}>
                    <Name
                        style={{
                            width: '90%',
                            textAlign: 'center',
                            fontSize: '16px',
                            fontWeight: 'bold',
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
