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
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { periodState } from '../../../recoil/period/period';
import { useSetRecoilState } from 'recoil';

function DiaryCalendar() {
    const param = useParams();
    const [loading, setLoading] = useState(false);
    const setMeal = useSetRecoilState(periodState);

    const [date, setDate] = useState(new Date());

    const navigate = useNavigate();
    useEffect(() => {
        const sessionStorage = window.sessionStorage;
        if (!sessionStorage.getItem('access_token')) {
            navigate('/login');
        }
        navigate(`./${date.setHours(0, 0, 0, 0)}`);
    }, []);
    const onChange = (d) => {
        setLoading(true);
        axios
            .get(
                `https://cryptic-castle-40575.herokuapp.com/api/v1/post/?date=${d.getTime()}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            )
            .then((response) => {
                setMeal((prev) => {
                    let copy = { ...prev };
                    copy.breakfast = [response.data];
                    console.log(copy);
                });
                console.log(response);
                setLoading(false);
            })
            .catch(() => {
                setMeal((prev) => {
                    return {
                        breakfast: [],
                        lunch: [],
                        dinner: [],
                        snack: [],
                        supplement: [],
                    };
                });
                setLoading(false);
            });
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
                    {loading ? (
                        <CircularProgress sx={{ marginBottom: 5 }} />
                    ) : (
                        <Calendar
                            locale='en-US'
                            onChange={onChange}
                            value={date}
                        />
                    )}
                </motion.div>
            </Contents>

            <Diary />
        </Container>
    );
}
export default DiaryCalendar;
