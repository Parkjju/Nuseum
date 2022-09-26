import { Contents } from './styled';
import Card from '../../atom/Card';
import Container from '../../atom/Container';

import diary from '../../../assets/notepad.png';
import record from '../../../assets/record.png';
import analysis from '../../../assets/analysis.png';
import food from '../../../assets/food.png';
import question from '../../../assets/q&a.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryTitle } from '../Record/styled';
import { Name } from '../../atom/Card/styled';

function Home() {
    const navigate = useNavigate();

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
