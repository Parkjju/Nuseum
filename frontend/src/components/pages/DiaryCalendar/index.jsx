import Container from '../../atom/Container';
import { Calendar } from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { Contents } from '../Home/styled';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import diary from '../../../assets/notepad.png';
import record from '../../../assets/record.png';
import analysis from '../../../assets/analysis.png';
import food from '../../../assets/food.png';
import question from '../../../assets/q&a.png';
import { DiaryTitle } from './styled';
import { Name } from '../../atom/Card/styled';
import Diary from '../Diary';
import { useDispatch, useSelector } from 'react-redux';
import { dateActions } from '../../../store/date-slice';

function DiaryCalendar() {
    // 뒤로가기로 돌아왔을때 오늘 선택된 날짜를 알아야 함
    const param = useParams();
    const location = useLocation();

    const dispatch = useDispatch();

    // onChange date를 위한 상태값
    const date = useSelector((state) => state.date.date);

    const [isDateSelected, setIsDateSelected] = useState(
        param.date !== undefined
    );

    const navigate = useNavigate();

    const onChange = (d) => {
        dispatch(dateActions.updateDate(d.getTime()));
        setIsDateSelected(true);
        navigate(`./${d.getTime()}`);
    };

    let menu = [];

    switch (location.pathname.split('/')[1]) {
        case 'diary':
            menu.push([diary, '식단일기', 'notepad']);
            break;
        case 'analysis':
            menu.push([analysis, '식이분석', 'analysis']);
            break;
        case 'food':
            menu.push([food, '맞춤식품', 'food']);
            break;
        case 'record':
            menu.push([record, '내 아이', 'record']);
            break;
        case 'question':
            menu.push([question, 'Q&A', 'question']);
            break;
        default:
            break;
    }

    return (
        <Container>
            <Contents>
                <DiaryTitle layoutId={menu[0][2]}>
                    <Name>{menu[0][1]}</Name>
                </DiaryTitle>
                <div
                    initial={{ y: 300 }}
                    animate={{ y: 0 }}
                    exit={{ y: -300 }}
                    transition={{
                        velocity: 1,
                    }}
                >
                    {location.pathname.split('/')[1] === 'diary' ? (
                        <Calendar
                            locale='en-US'
                            onChange={onChange}
                            value={new Date(date)}
                        />
                    ) : null}
                </div>
                {isDateSelected ? null : (
                    <Name
                        style={{
                            width: '80%',
                            marginTop: 30,
                            whiteSpace: 'normal',
                            lineHeight: 2,
                            textAlign: 'justify',
                            color: '#7E8C8D',
                            fontWeight: '400',
                            fontSize: '13px'
                        }}
                    >
                        본 식단일기는 내아이의 영양상태와 식행동을 분석하기 위해
                        사용됩니다. 아이가 가정에서는 물론 어린이집/유치원이나
                        외식에서 먹는 것도 모두 포함해서 사진과
                        섭취내용(섭취량)을 기록해주세요.
                    </Name>
                )}
            </Contents>

            {isDateSelected ? <Diary /> : null}
        </Container>
    );
}
export default DiaryCalendar;
