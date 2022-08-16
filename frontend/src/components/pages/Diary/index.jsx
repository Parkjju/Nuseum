// 식단일기 메뉴
import morning from '../../../assets/morning.png';
import lunch from '../../../assets/lunch.png';
import dinner from '../../../assets/dinner.png';
import cake from '../../../assets/cake.png';
import supplement from '../../../assets/drug.png';

import Card from '../../atom/Card';
import { Contents } from '../Home/styled';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { periodState } from '../../../recoil/period/period';
import axios from 'axios';
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
        [supplement, '영양제', 'supplement'],
    ];
    const meal = useRecoilValue(periodState);

    const onSubmit = (e) => {
        e.preventDefault();
        let postData = { ...meal };
        for (let i in postData) {
            if (postData[i] !== []) {
                postData[i] = postData[i].map((item) => {
                    if (item.length === 2) {
                        return;
                    }
                    let copyItem = [...item];
                    copyItem.shift();
                    copyItem = copyItem.map((element) => Number(element));
                    return [...copyItem];
                });
            }
        }
        console.log({
            breakfast: [...postData.breakfast],
            lunch: [...postData.lunch],
            dinner: [...postData.dinner],
            snack: [...postData.snack],
            supplement: [...postData.supplement],
        });

        axios
            .post(
                'https://cryptic-castle-40575.herokuapp.com/api/v1/post/',
                {
                    breakfast: [...postData.breakfast],
                    lunch: [...postData.lunch],
                    dinner: [...postData.dinner],
                    snack: [...postData.snack],
                    supplement: [...postData.supplement],
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            )
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
    };

    return (
        <Contents>
            <Card menu={menu} />

            <FormBox onSubmit={onSubmit}>
                <button style={{ marginBottom: '30px' }}>저장</button>
            </FormBox>
        </Contents>
    );
}
export default Diary;
