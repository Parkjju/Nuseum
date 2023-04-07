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

function Home() {
    const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');
    const lang = useSelector((state) => state.language.isKorean);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
    }, [dispatch]);

    const menu = [
        [diary, lang ? 'DIARY' : '일기', 'diary'],
        [analysis, lang ? 'ANALYSIS' : '분석', 'analysis'],
        [food, lang ? 'FOOD' : '맞춤식품', 'food'],
        // [record, lang ? 'HEALTH RECORD' : '내 아이', 'record'],
        [question, lang ? 'QUESTION' : 'Q&A', 'question'],
    ];

    return (
        <Container>
            <Contents>
                <DiaryTitle layoutId={menu[0][2]}>
                    <Name
                        style={{
                            width: '90%',
                            textAlign: 'center',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    >
                        {/* {lang
                            ? 'A Study on Customized Nutrition Management and Information Provision'
                            : '맞춤형 영양관리 및 정보제공 연구'} */}
                    </Name>
                </DiaryTitle>
                <Card menu={menu} current='home' />
            </Contents>
        </Container>
    );
}

export default Home;
