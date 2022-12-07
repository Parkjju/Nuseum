// 식단일기 메뉴
import morning from '../../../assets/morning.png';
import lunch from '../../../assets/lunch.png';
import dinner from '../../../assets/dinner.png';
import cake from '../../../assets/cake.png';
import supplement from '../../../assets/drug.png';
import water from '../../../assets/water.png';
import today from '../../../assets/today.png';

import Card from '../../atom/Card';
import { Contents } from '../Home/styled';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Diary() {
    const navigate = useNavigate();
    const lang = useSelector((state) => state.language.isKorean);

    const menu = [
        [morning, lang ? 'morning' : '아침', 'breakfast'],
        [lunch, lang ? 'lunch' : '점심', 'lunch'],
        [dinner, lang ? 'dinner' : '저녁', 'dinner'],
        [cake, lang ? 'snack' : '간식', 'snack'],
        [supplement, lang ? 'supplement' : '영양제', 'supplement'],
        [water, lang ? 'water' : '물', 'water'],
        [today, lang ? 'today' : '오늘', 'today'],
    ];

    return (
        <Contents>
            <Card menu={menu} />
        </Contents>
    );
}
export default Diary;
