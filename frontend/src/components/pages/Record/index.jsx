import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { useParams } from 'react-router-dom';

import morning from '../../../assets/morning.png';
import mid from '../../../assets/lunch.png';
import night from '../../../assets/dinner.png';
import cake from '../../../assets/cake.png';
import drug from '../../../assets/drug.png';
import water from '../../../assets/water.png';
import today from '../../../assets/today.png';

import { DiaryTitle } from './styled';
import { Icon, Name } from '../../atom/Card/styled';
import React from 'react';
import Water from '../Water';
import Today from '../Today';
import Supplement from '../Supplement';
import Meal from '../Meal';
import { useSelector } from 'react-redux';

function Record() {
    const param = useParams();
    const lang = useSelector((state) => state.language.isKorean);

    let menu = [];

    switch (param.when) {
        case 'breakfast':
            menu.push([morning, lang ? 'morning' : '아침', 'breakfast']);
            break;
        case 'lunch':
            menu.push([mid, lang ? 'mid' : '점심', 'lunch']);
            break;
        case 'dinner':
            menu.push([night, lang ? 'night' : '저녁', 'dinner']);
            break;
        case 'snack':
            menu.push([cake, lang ? 'cake' : '간식', 'snack']);
            break;
        case 'supplement':
            menu.push([drug, lang ? 'drug' : '영양제', 'supplement']);
            break;
        case 'water':
            menu.push([water, lang ? 'water' : '물', 'water']);
            break;
        case 'today':
            menu.push([today, lang ? 'today' : '오늘', 'today']);
            break;
        default:
            break;
    }

    return (
        <Container>
            <Contents>
                <DiaryTitle layoutId={menu[0][2]}>
                    <Icon style={{ width: '40px' }} src={menu[0][0]} />
                    <Name
                        style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    >
                        {menu[0][1]}
                    </Name>
                </DiaryTitle>
                {/* param.when url에 따라 분기하는 장소 */}
                <Name
                    style={{
                        marginBottom: '5px',
                        width: 270,
                        lineHeight: 1.5,
                        textAlign: 'center',
                    }}
                >
                    {param.when === 'supplement'
                        ? lang
                            ? 'Please record the nutritional supplements you took today :) Photos of the names of the nutritional supplements and the nutritional table are also helpful.'
                            : '오늘 섭취한 영양제를 기록해주세요 :) 영양제의 이름과 영양성분표의 사진도 도움이 됩니다.'
                        : param.when === 'water'
                        ? lang
                            ? 'Please record the water you drank today :)'
                            : '오늘 섭취한 물을 기록해주세요 :)'
                        : param.when === 'today'
                        ? lang
                            ? 'Summarize the food information you ate today.'
                            : '오늘 섭취한 음식정보를 요약합니다.'
                        : lang
                        ? 'Upload the food image and enter the dietary information :) Before and after the meal, the name and nutritional table of the food, the receipt of the ingredient purchase or the receipt of the dining out are also helpful.'
                        : `음식 이미지를 업로드하고 식이정보를 입력하세요 :) 식사의 전후, 식품의 이름과 영양성분표, 식재료구매 영수증이나 외식 영수증의 사진도 도움이 됩니다.`}
                </Name>
                <Name style={{ marginBottom: '50px' }}>
                    {/* 식이정보를 입력하세요 :) */}
                </Name>
                {param.when === 'supplement' ? (
                    <Supplement />
                ) : // URL에 따라 분기하는 장소
                param.when === 'water' ? (
                    <Water />
                ) : param.when === 'today' ? (
                    <Today date={param.date} />
                ) : (
                    <Meal />
                )}
            </Contents>
        </Container>
    );
}

export default Record;
