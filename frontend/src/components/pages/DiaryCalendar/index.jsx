import Container from '../../atom/Container';
import { Calendar } from 'react-calendar';
import { useEffect, useState } from 'react';
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
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { periodState } from '../../../recoil/period/period';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dateState } from '../../../recoil/date/date';
import { postIdState } from '../../../recoil/postID/postId';

function DiaryCalendar() {
    const param = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [meal, setMeal] = useRecoilState(periodState);
    const [date, setDate] = useRecoilState(dateState);
    const setPostId = useSetRecoilState(postIdState);
    const [isDateSelected, setIsDateSelected] = useState(
        param.date !== undefined
    );

    const setMealData = (key, res) => {
        let data = [];
        let parsedAmount = [];
        switch (key) {
            case 'breakfast':
                parsedAmount = JSON.parse(res.breakfast_amount);
                for (let i in parsedAmount) {
                    data.push([res.breakfast[i], parsedAmount[i]]);
                }
                return data;
            case 'lunch':
                parsedAmount = JSON.parse(res.lunch_amount);
                for (let i in parsedAmount) {
                    data.push([res.lunch[i], parsedAmount[i]]);
                }
                return data;
            case 'dinner':
                parsedAmount = JSON.parse(res.dinner_amount);
                for (let i in parsedAmount) {
                    data.push([res.dinner[i], parsedAmount[i]]);
                }
                return data;
            case 'snack':
                parsedAmount = JSON.parse(res.snack_amount);
                for (let i in parsedAmount) {
                    data.push([res.snack[i], parsedAmount[i]]);
                }
                return data;
            case 'supplement':
                parsedAmount = JSON.parse(res.supplement_amount);
                for (let i in parsedAmount) {
                    data.push([res.supplement[i], parsedAmount[i]]);
                }
                return data;
            default:
                return null;
        }
    };
    const appendImages = (res) => {
        let fetchImages = {
            breakfast: {
                image: [],
            },
            lunch: {
                image: [],
            },
            dinner: {
                image: [],
            },
            snack: {
                image: [],
            },
        };

        for (let i in res.meal) {
            fetchImages[i].image = [...res.meal[i].image];
        }

        return fetchImages;
    };
    const loopFunction = (res) => {
        let copy = {
            breakfast: {
                data: [],
                image: null,
            },
            lunch: {
                data: [],
                image: null,
            },
            dinner: {
                data: [],
                image: null,
            },
            snack: {
                data: [],
                image: null,
            },
            supplement: {
                data: [],
                image: null,
            },
        };
        for (let i in res) {
            copy[i].data = [...res[i].data];

            if (res[i].data.length) {
                res[i].data.forEach((item) => {
                    if (item.post_id) {
                        setPostId(item.post_id);
                        return;
                    }
                });
                break;
            }
        }

        return copy;
    };
    const updateMeal = (meal, images) => {
        let promises = [];
        let names = {
            breakfast: [],
            lunch: [],
            dinner: [],
            snack: [],
            supplement: [],
        };

        for (let key in meal) {
            meal[key].data.forEach((item) => {
                promises.push(
                    axios
                        .get(
                            `https://nuseum-server.herokuapp.com/api/v1/food/name/?id=${item.food_id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem(
                                        'access_token'
                                    )}`,
                                },
                            }
                        )
                        .then((response) => {
                            names[key].push(response.data.name);
                        })
                );
            });
        }

        Promise.all(promises).then(() => {
            let copy = { ...meal };
            for (let i in copy) {
                let temp = [];
                copy[i].data.forEach((item) => {
                    let tempItem = {
                        name: names[i].shift(),
                        food_id: item.food_id,
                        amount: item.amount,
                    };
                    temp.push(tempItem);
                });
                copy[i].data = [...temp];
            }

            setMeal({
                breakfast: {
                    data: [...copy.breakfast.data],
                    image: [...images.breakfast.image],
                },
                lunch: {
                    data: [...copy.lunch.data],
                    image: [...images.lunch.image],
                },
                dinner: {
                    data: [...copy.dinner.data],
                    image: [...images.dinner.image],
                },
                snack: {
                    data: [...copy.snack.data],
                    image: [...images.snack.image],
                },
                supplement: { data: [...copy.supplement.data], image: null },
            });
        });
    };

    const navigate = useNavigate();
    useEffect(() => {
        const sessionStorage = window.sessionStorage;
        if (!sessionStorage.getItem('access_token')) {
            navigate('/login');
        }
    }, []);

    const onChange = (d) => {
        setLoading(true);
        axios
            .get(
                `https://nuseum-server.herokuapp.com/api/v1/post/?date=${d.getTime()}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            )
            .then((response) => {
                let copy = loopFunction(response.data.meal);
                let images = appendImages(response.data);
                updateMeal({ ...copy }, images);

                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 403) {
                    alert('세션이 만료되었습니다. 다시 로그인 해주세요!');
                    navigate('/login');
                    return;
                }
                setMeal((prev) => {
                    return {
                        breakfast: { data: [], image: '' },
                        lunch: { data: [], image: '' },
                        dinner: { data: [], image: '' },
                        snack: { data: [], image: '' },
                        supplement: { data: [], image: '' },
                    };
                });
                setLoading(false);
                setPostId(null);
                alert('이 날에는 기록하지 않으셨네요!');
            });
        setDate(d);
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
                    ) : location.pathname.split('/')[1] === 'diary' ? (
                        <Calendar
                            locale='en-US'
                            onChange={onChange}
                            value={date}
                        />
                    ) : null}
                </motion.div>
            </Contents>

            {isDateSelected && !loading ? <Diary date={date} /> : null}
        </Container>
    );
}
export default DiaryCalendar;
