// 식단일기 메뉴
import morning from '../../../assets/morning.png';
import lunch from '../../../assets/lunch.png';
import dinner from '../../../assets/dinner.png';
import cake from '../../../assets/cake.png';
import drug from '../../../assets/drug.png';

import Card from '../../atom/Card';
import { Contents } from '../Home/styled';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { periodState } from '../../../recoil/period/period';
import { Textarea } from './styled';
import { Name } from '../../atom/Card/styled';
import { FormBox } from '../../molecules/Login/styled';

function Diary() {
    const navigate = useNavigate();
    useEffect(() => {
        const sessionStorage = window.sessionStorage;
        if (!sessionStorage.getItem('access_token')) {
            navigate('/login');
        }
    }, []);
    const menu = [
        [morning, '아침', 'breakfast'],
        [lunch, '점심', 'lunch'],
        [dinner, '저녁', 'dinner'],
        [cake, '간식', 'snack'],
        [drug, '영양제', 'drug'],
    ];
    const meal = useRecoilValue(periodState);

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Contents>
            <Card menu={menu} />
            <FormBox onSubmit={onSubmit}>
                <Name style={{ marginBottom: '20px' }}>일기 제목</Name>
                <input
                    type='text'
                    style={{
                        border: 'none',
                        marginBottom: '20px',
                        outline: 'none',
                        borderBottom: '1px solid rgba(0,0,0,0.2)',
                        width: '100px',
                        textAlign: 'center',
                    }}
                    maxLength='10'
                />
                <Name style={{ marginBottom: '20px' }}>
                    오늘 먹은 음식에 대해 이야기해주세요.
                </Name>
                <Textarea
                    rows='5'
                    maxlength='200'
                    placeholder='200자 까지 입력 가능합니다.'
                />
                <button style={{ marginBottom: '30px' }}>저장</button>
            </FormBox>
        </Contents>
    );
}
export default Diary;
