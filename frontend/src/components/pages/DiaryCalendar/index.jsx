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
import { mealImageState, periodState } from '../../../recoil/period/period';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { dateState } from '../../../recoil/date/date';
import { postIdState } from '../../../recoil/postID/postId';
import { supplementState } from '../../../recoil/supplement/supplement';

function DiaryCalendar() {
    const param = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const setMeal = useSetRecoilState(periodState);
    const [date, setDate] = useRecoilState(dateState);
    const setPostId = useSetRecoilState(postIdState);
    const setGlobalImage = useSetRecoilState(mealImageState);
    const supplement = useRecoilValue(supplementState);
    const setSupplement = useSetRecoilState(supplementState);
    const [isDateSelected, setIsDateSelected] = useState(
        param.date !== undefined
    );

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
        }
        for (let i in res) {
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
                            `https://cryptic-castle-40575.herokuapp.com/api/v1/food/name/?id=${item.food_id}`,
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
    }, [navigate]);

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
                let copy = loopFunction(response.data.meal);
                let images = appendImages(response.data);
                setSupplement([...response.data.supplement]);
                updateMeal({ ...copy }, images);

                setGlobalImage(() => {
                    let copy = {};
                    for (let i in images) {
                        copy[i] = [...images[i].image];
                    }
                    return copy;
                });

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
            <Contents>
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
                {isDateSelected ? null : (
                    <Name
                        style={{
                            width: '80%',
                            marginTop: 30,
                            whiteSpace: 'normal',
                            lineHeight: 2,
                            textAlign: 'justify',
                        }}
                    >
                        본 식단일기는 내아이의 영양상태와 식행동을 분석하기 위해
                        사용됩니다. 아이가 가정에서는 물론 어린이집/유치원이나
                        외식에서 먹는 것도 모두 포함해서 사진과
                        섭취내용(섭취량)을 기록해주세요. 식사의 전후, 식품과
                        영양제의 이름과 영양성분표, 식재료구매 영수증이나 외식
                        영수증의 사진도 도움이 됩니다.
                    </Name>
                )}
            </Contents>

            {isDateSelected && !loading ? <Diary date={date} /> : null}
        </Container>
    );
}
export default DiaryCalendar;
