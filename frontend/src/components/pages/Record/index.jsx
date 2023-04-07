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
            menu.push([morning, lang ? 'breakfast' : '아침', 'breakfast']);
            break;
        case 'lunch':
            menu.push([mid, lang ? 'lunch' : '점심', 'lunch']);
            break;
        case 'dinner':
            menu.push([night, lang ? 'dinner' : '저녁', 'dinner']);
            break;
        case 'snack':
            menu.push([cake, lang ? 'snack' : '간식', 'snack']);
            break;
        case 'supplement':
            menu.push([drug, lang ? 'supplement' : '보충제', 'supplement']);
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
                    <Icon style={{ width: '40px', display:'none' }} src={menu[0][0]} />
                    <Name
                        style={{
                            fontSize: '18px',
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
                            ? ''
                            : ''
                        : param.when === 'water'
                        ? lang
                            ? ''
                            : ''
                        : param.when === 'today'
                        ? lang
                            ? ''
                            : ''
                        : lang
                        ? ''
                        : ``}
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
