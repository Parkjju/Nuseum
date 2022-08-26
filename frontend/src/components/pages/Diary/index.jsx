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
import { useRecoilState, useRecoilValue } from 'recoil';
import { mealImageState, periodState } from '../../../recoil/period/period';
import axios from 'axios';
import { FormBox } from '../../molecules/Login/styled';
import { postIdState } from '../../../recoil/postID/postId';

function Diary({ date }) {
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
        [water, '물', 'water'],
        [today, '오늘', 'today'],
    ];
    const meal = useRecoilValue(periodState);

    const mealImages = useRecoilValue(mealImageState);

    const [postId, setPostId] = useRecoilState(postIdState);

    const deleteFoodName = (postData) => {
        for (let i of Object.keys(postData)) {
            if (postData[i].data.length === 0) {
                continue;
            }
            postData[i].image = mealImages[i];

            postData[i].data = postData[i].data.map((meal) => {
                let copy = { ...meal };
                delete copy.name;
                return { ...copy };
            });
        }
        return { ...postData };
    };

    const onSubmit = (e) => {
        e.preventDefault();

        let postData = { ...meal };
        let copy = {
            breakfast: {
                data: [...meal.breakfast.data],
                image: meal.breakfast.image,
            },
            lunch: {
                data: [...meal.lunch.data],
                image: meal.lunch.image,
            },
            dinner: {
                data: [...meal.dinner.data],
                image: meal.dinner.image,
            },
            snack: {
                data: [...meal.snack.data],
                image: meal.snack.image,
            },
        };
        copy = deleteFoodName(copy);
        console.log(copy);

        if (postId === null || postId === undefined) {
            axios
                .post(
                    'https://cryptic-castle-40575.herokuapp.com/api/v1/post/',
                    {
                        meal: { ...copy },
                        created_at: date.getTime(),
                        water: 0,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    alert('일지 등록이 완료되었어요☺️');
                    setPostId(() => {
                        return {
                            id: response.data.id,
                        };
                    });
                })
                .catch((err) => console.log(err));
        } else {
            axios
                .put(
                    `https://cryptic-castle-40575.herokuapp.com/api/v1/post/${postId}/`,
                    {
                        meal: { ...copy },
                        water: 0,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .then((response) => alert('일지 수정이 완료되었어요☺️'))
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <Contents>
            <Card menu={menu} />

            <FormBox
                onSubmit={onSubmit}
                style={{
                    display: 'flex',
                    width: '320px',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
            >
                <button
                    style={{
                        marginBottom: '30px',
                        position: 'relative',
                        left: '10px',
                    }}
                >
                    저장
                </button>
            </FormBox>
        </Contents>
    );
}
export default Diary;
