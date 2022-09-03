import { useEffect, useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { periodState } from '../../../recoil/period/period';
import { Box, Gauge } from './Water.style';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { postIdState } from '../../../recoil/postID/postId';
import { supplementState } from '../../../recoil/supplement/supplement';
import { waterState } from '../../../recoil/water/water';

const Water = () => {
    const [water, setWater] = useRecoilState(waterState);
    const [count, setCount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
    const boxRef = useRef();
    const [boxWidth, setBoxWidth] = useState(
        window.innerWidth > 800 ? 800 * 0.8 : window.innerWidth * 0.8
    );
    const [mealState, setMealState] = useRecoilState(periodState);
    const [supplement, setSupplement] = useRecoilState(supplementState);
    const postId = useRecoilValue(postIdState);
    const params = useParams();

    window.onresize = () => {
        setBoxWidth(boxRef.current.clientWidth);
    };

    window.onload = () => {
        setBoxWidth(boxRef.current.clientWidth);
    };

    const saveWater = () => {
        if (postId) {
            axios
                .put(
                    `https://cryptic-castle-40575.herokuapp.com/api/v1/post/${postId}/`,

                    {
                        meal: {
                            breakfast: { ...mealState.breakfast },
                            lunch: { ...mealState.lunch },
                            dinner: { ...mealState.dinner },
                            snack: { ...mealState.snack },
                        },
                        supplement: [...supplement],
                        water: water,
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
                    alert('일기 수정이 완료되었어요!');
                })
                .catch((err) => {
                    alert(`오류가 발생했습니다. 개발자에게 문의해주세요!`);
                });
        } else {
            axios
                .post(
                    'https://cryptic-castle-40575.herokuapp.com/api/v1/post/',
                    {
                        meal: { ...mealState.meal },
                        supplement: [...supplement],
                        water: water,
                        created_at: `${params.date}`,
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
                    alert('일기 등록이 완료되었어요!');
                    console.log(response);
                })
                .catch((err) => {
                    alert('오류가 발생했습니다. 개발자에게 문의해주세요!');
                });
        }
    };

    const plusWater = useCallback(
        (amount) => {
            if (water >= 2000) {
                setWater((prev) => prev + amount);
                return;
            }
            setCurrentAmount(amount);
            let id = setInterval(() => {
                setWater((prev) => prev + 10);
                setCount((prev) => prev + 10);
            }, 0);
            setIntervalId(id);
        },
        [water]
    );

    useEffect(() => {
        if (count >= currentAmount) {
            clearInterval(intervalId);
            setCount(0);
            setCurrentAmount(0);
            setIntervalId(null);
        }
    }, [water, count, currentAmount, intervalId, params.date]);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '80%',
                    marginBottom: 30,
                }}
            >
                <span>마신 양 : {water}ml</span>
                <span>
                    남은 양 :{' '}
                    {2000 - water > 0 ? 2000 - water : `+ ${water - 2000}`}ml
                </span>
            </div>

            <Box ref={boxRef}>
                <Gauge water={water} maxWidth={boxWidth} />
            </Box>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '30%',
                    marginTop: 30,
                }}
            >
                <button
                    style={{ width: 100, marginRight: 5 }}
                    onClick={() => plusWater(250)}
                >
                    250ml
                </button>
                <button
                    style={{ width: 100, marginRight: 5 }}
                    onClick={() => plusWater(750)}
                >
                    750ml
                </button>
                <button
                    style={{ width: 100, marginRight: 5 }}
                    onClick={() => plusWater(1000)}
                >
                    1000ml
                </button>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '80%',
                    marginTop: 30,
                }}
            >
                <button
                    style={{ width: 100, marginRight: 5 }}
                    onClick={saveWater}
                >
                    저장하기
                </button>
            </div>
        </>
    );
};

export default Water;
