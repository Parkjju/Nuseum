import { useEffect, useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Box, Gauge } from './Water.style';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';

const Water = () => {
    const params = useParams();
    const lang = useSelector((state) => state.language.isKorean);
    const token = useSelector((state) => state.auth.token);

    // water amount & object id
    const water = useSelector((state) => state.water.amount);
    const waterPostId = useSelector((state) => state.water.id);

    const dispatch = useDispatch();
    const action = useActions(params.when);

    const [count, setCount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);

    const boxRef = useRef();
    const [boxWidth, setBoxWidth] = useState(
        window.innerWidth > 800 ? 800 * 0.8 : window.innerWidth * 0.8
    );

    const [loading, setLoading] = useState(false);

    window.onresize = () => {
        setBoxWidth(boxRef.current.clientWidth);
    };

    window.onload = () => {
        setBoxWidth(boxRef.current.clientWidth);
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/v1/consumption/water/?date=${params.date}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response.data);

                if (response.data.length === 0) {
                    dispatch(action.removeAll());
                    dispatch(action.getId(null));
                    setLoading(false);
                    return;
                }
                console.log(response.data[0]);
                dispatch(action.initializeAmount(response.data[0].amount));
                dispatch(action.getId(response.data[0].id));
                setLoading(false);
            })
            .catch(async (err) => {
                console.log(err);
                if (err.response.status === 401) {
                    setLoading(false);
                    return;
                }
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                setLoading(false);
            });
    }, [dispatch]);

    useEffect(() => {
        if (count >= currentAmount) {
            setCount(0);
            setCurrentAmount(0);
        }
    }, [water, count, currentAmount, params.date]);

    const sendWaterRequest = async () => {
        try {
            setLoading(true);
            if (water > 0 && waterPostId) {
                await axios.patch(
                    `/api/v1/consumption/water/${waterPostId}/`,
                    {
                        amount: water,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                await axios.post(
                    '/api/v1/consumption/water/',
                    {
                        type: 'water',
                        created_at: params.date,
                        amount: water,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
            alert(
                lang ? 'Water input completed!' : '수분 입력이 완료되었습니다!'
            );
            setLoading(false);
        } catch (err) {
            if (err.response.status === 401) {
                setLoading(false);
                return;
            }
            alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            setLoading(false);
        }
    };

    // 부드럽게 게이지 올라가도록 하는 함수
    const plusWater = useCallback(
        (amount) => {
            if (water >= 1500) {
                dispatch(action.addWaterAmount(250));
                return;
            }
            setCurrentAmount(amount);
            dispatch(action.addWaterAmount(250));
            setCount((prev) => prev + 250);
            // let id = setInterval(() => {
            // }, 0);
            // setIntervalId(id);
        },
        [water]
    );
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
                <span
                    style={{
                        whiteSpace: 'pre-line',
                        width: '40%',
                        display: 'block',
                    }}
                >
                    {lang
                        ? `Amount of drink water : ${water}ml`
                        : `마신 양 : ${water}ml`}
                </span>
                <span
                    style={{
                        whiteSpace: 'pre-line',
                        width: '40%',
                        display: 'block',
                    }}
                >
                    {lang
                        ? `Remaining amount : ${
                              1500 - water > 0
                                  ? 1500 - water
                                  : `+ ${water - 1500}`
                          }ml`
                        : `남은 양 :
                    ${1500 - water > 0 ? 1500 - water : `+ ${water - 1500}`}ml`}
                </span>
            </div>

            <Box ref={boxRef}>
                <Gauge water={water} maxWidth={boxWidth} />
            </Box>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '30%',
                    marginTop: 30,
                }}
            >
                <button
                    style={{
                        border: 'none',
                        borderRadius: '20px',
                        padding: '5px 35px',
                    }}
                    onClick={() => plusWater(250)}
                >
                    250ml
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
                {loading ? (
                    <CircularProgress sx={{ marginBottom: 5 }} />
                ) : (
                    <button
                        onClick={() => sendWaterRequest()}
                        style={{
                            background: '#8A8A8E',
                            border: 'none',
                            borderRadius: '20px',
                            padding: '5px 35px',
                            color: 'white',
                        }}
                    >
                        {lang ? 'Save' : '저장'}
                    </button>
                )}
            </div>
        </>
    );
};

export default Water;
