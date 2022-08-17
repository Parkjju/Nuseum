import Container from '../../atom/Container';
import { Calendar } from 'react-calendar';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { Contents } from '../Home/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import diary from '../../../assets/notepad.png';
import record from '../../../assets/record.png';
import analysis from '../../../assets/analysis.png';
import food from '../../../assets/food.png';
import question from '../../../assets/q&a.png';
import { DiaryTitle } from './styled';
import { Name } from '../../atom/Card/styled';
import Diary from '../Diary';

function DiaryCalendar() {
    const [date, setDate] = useState(new Date());

    const param = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const sessionStorage = window.sessionStorage;
        if (!sessionStorage.getItem('access_token')) {
            navigate('/login');
        }
        navigate(`./${date.setHours(0, 0, 0, 0)}`);
    }, []);
    const onChange = (d) => {
        setDate(d);
        navigate(`./${d.getTime()}`);
    };

    let menu = [];

    switch (param.category) {
        case 'diary':
            menu.push([diary, '식단일기', 'notepad']);
            break;
        case 'record':
            menu.push([record, '식이분석', 'record']);
            break;
        case 'analysis':
            menu.push([analysis, '맞춤식품', 'analysis']);
            break;
        case 'food':
            menu.push([food, '내 아이', 'food']);
            break;
        case 'question':
            menu.push([question, 'Q&A', 'question']);
            break;
        default:
            break;
    }

    return (
        <Container>
            <Contents style={{}}>
                <DiaryTitle layoutId={menu[0][2]}>
                    <Name>{menu[0][1]}</Name>
                </DiaryTitle>
                <motion.div
                    initial={{ y: 300 }}
                    animate={{ y: 0 }}
                    exit={{ y: -300 }}
                    transition={{
                        velocity: 1,
                    }}
                >
                    <Calendar locale='en-US' onChange={onChange} value={date} />
                </motion.div>
            </Contents>

            <Diary />
        </Container>
    );
}
export default DiaryCalendar;
