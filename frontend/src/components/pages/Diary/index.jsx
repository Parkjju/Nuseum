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

    const makePutRequestData = (meal) => {
        let postData = { ...meal };
        console.log('PUTREQUESTDATA function', postData);
        for (let i of Object.keys(postData)) {
            let amountSaveArray = [];
            if (postData[i].length === 0) {
                postData = {
                    ...postData,
                    [`${i}`]: [],
                    [`${i}_amount`]: JSON.stringify([]),
                };
                continue;
            }
            postData[i] = postData[i].map((amount) => {
                amountSaveArray.push(amount.at(-1));
                let copy = [...amount];
                copy.pop();
                return [...copy];
            });

            postData = {
                ...postData,
                [`${i}`]: [...postData[i].flat()],
                [`${i}_amount`]: JSON.stringify([...amountSaveArray]),
            };
        }

        return { ...postData };
    };

    const makePostRequestData = (meal) => {
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

        return { ...postData };
    };

    const deleteFoodName = (postData) => {
        for (let i of Object.keys(postData)) {
            if (postData[i].length === 0) {
                continue;
            }

            postData[i] = postData[i].map((meal) => {
                let copy = [...meal];
                copy.shift();
                copy = copy.map((item) => Number(item));
                return [...copy];
            });
        }
        return { ...postData };
    };

    console.log(postId.id);
    const onSubmit = (e) => {
        e.preventDefault();
        let postData = { ...meal };

        postData = { ...deleteFoodName({ ...postData }) };

        if (postId.id === undefined || postId.id === null) {
            let temp = makePostRequestData({ ...meal });
            postData = { ...temp };
        } else {
            let temp = makePutRequestData({ ...postData });
            postData = { ...temp };
        }
        if (postId.id === null || postId.id === undefined) {
            console.log('POST직전');
            console.log('POST 직전 정제 데이터', postData);
            axios
                .post(
                    'https://cryptic-castle-40575.herokuapp.com/api/v1/post/',
                    {
                        breakfast: [...postData.breakfast],
                        lunch: [...postData.lunch],
                        dinner: [...postData.dinner],
                        snack: [...postData.snack],
                        supplement: [...postData.supplement],
                        created_at: `${date.getTime()}`,
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
                    console.log('일지 등록이 완료되었어요☺️');
                    setPostId(() => {
                        return {
                            id: response.data.id,
                        };
                    });
                })
                .catch((err) => console.log(err));
        } else {
            console.log('PUT 날리는중..');
            console.log('PUT 최종 데이터:', {
                breakfast: [...postData.breakfast],
                breakfast_amount: postData.breakfast_amount,
                lunch: [...postData.lunch],
                lunch_amount: postData.lunch_amount,
                dinner_amount: postData.dinner_amount,
                dinner: [...postData.dinner],
                snack: [...postData.snack],
                snack_amount: postData.snack_amount,
                supplement: [...postData.supplement],
                supplement_amount: postData.supplement_amount,
            });
            axios
                .put(
                    `https://cryptic-castle-40575.herokuapp.com/api/v1/post/${postId.id}/`,
                    {
                        breakfast: [...postData.breakfast],
                        breakfast_amount: postData.breakfast_amount,
                        lunch: [...postData.lunch],
                        lunch_amount: postData.lunch_amount,
                        dinner_amount: postData.dinner_amount,
                        dinner: [...postData.dinner],
                        snack: [...postData.snack],
                        snack_amount: postData.snack_amount,
                        supplement: [...postData.supplement],
                        supplement_amount: postData.supplement_amount,
                        // breakfast_img1: mealImages.breakfast_img1,
                        // breakfast_img2: mealImages.breakfast_img2,
                        // breakfast_img3: mealImages.breakfast_img3,
                        // lunch_img1: mealImages.lunch_img1,
                        // lunch_img2: mealImages.lunch_img2,
                        // lunch_img3: mealImages.lunch_img3,
                        // dinner_img1: mealImages.dinner_img1,
                        // dinner_img2: mealImages.dinner_img2,
                        // dinner_img3: mealImages.dinner_img3,
                        // snack_img1: mealImages.snack1,
                        // snack_img2: mealImages.snack2,
                        // snack_img3: mealImages.snack3,
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
                .catch((err) => console.log(err));
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
