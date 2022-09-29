import { useEffect, useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Box, Gauge } from './Water.style';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
import jwt_decode from 'jwt-decode';
import { authActions } from '../../../store/auth-slice';

let initial = true;
const Water = () => {
    const params = useParams();
    const token = useSelector((state) => state.auth.token);

    // water amount & object id
    const water = useSelector((state) => state.water.amount);
    const waterPostId = useSelector((state) => state.water.id);

    const dispatch = useDispatch();
    const action = useActions(params.when);

    const [count, setCount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
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
        // 두번 실행됨
        if (initial) {
            initial = false;
            return;
        } else {
            setLoading(true);
            axios
                .get(
                    `https://nuseum-v2.herokuapp.com/api/v1/consumption/water/?date=${params.date}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then((response) => {
                    if (response.data.length === 0) {
                        setLoading(false);
                        return;
                    }

                    dispatch(action.addWaterAmount(response.data[0].amount));
                    dispatch(action.getId(response.data[0].id));
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.status === 401) {
                        // 401이면 액세스토큰 만료임
                        // 액세스토큰 만료된거면 새로 재발급받고
                        // 재발급 과정에서 리프레시토큰이 만료된 상태라면
                        // 406이며 로그인 다시 해야함
                        axios
                            .post(
                                'https://nuseum-v2.herokuapp.com/api/v1/account/token/refresh/',
                                {},
                                {
                                    headers: {
                                        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxLCJpYXQiOjEsImp0aSI6ImFjZTcxMzE5YmVkMDQwYzFhMWMxODgyNGYzOWUzNTVlIiwidXNlcl9pZCI6MH0.P1e_v6fDHgG4qaODzLDvKTFgGBBNK7pmH_9M--MpfwA`,
                                    },
                                }
                            )
                            .then((response) => {
                                const decodedData = jwt_decode(
                                    response.data.access
                                );
                                dispatch(
                                    authActions.login({
                                        token: response.data.access,
                                        expiration_time: decodedData.exp,
                                    })
                                );
                                setLoading(false);
                            })
                            .catch((err) => {
                                if (
                                    err.response.data.messages[0].token_type ===
                                    'refresh'
                                ) {
                                    alert(
                                        '세션이 만료되었습니다. 다시 로그인해주세요!'
                                    );
                                    dispatch(authActions.logout());
                                    navigate('/login');
                                }
                                if (
                                    err.response.data?.detail ===
                                    'Token is blacklisted'
                                ) {
                                    dispatch(authActions.logout());
                                    navigate('/login');
                                }
                                setLoading(false);
                            });
                        return;
                    } else {
                        alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                    }
                    setLoading(false);
                });
            initial = true;
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (count >= currentAmount) {
            clearInterval(intervalId);
            setCount(0);
            setCurrentAmount(0);
            setIntervalId(null);
        }
    }, [water, count, currentAmount, intervalId, params.date]);

    console.log('WATER: ', water);
    const sendWaterRequest = async () => {
        try {
            setLoading(true);
            if (water > 0 && waterPostId) {
                await axios.patch(
                    `https://nuseum-v2.herokuapp.com/api/v1/consumption/water/${waterPostId}/`,
                    {
                        amount: water,
                    },
                    {
                        headrs: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                await axios.post(
                    'https://nuseum-v2.herokuapp.com/api/v1/consumption/water/',
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
            alert('수분 입력이 완료되었습니다!');
            setLoading(false);
        } catch (err) {
            console.log(err);
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
            let id = setInterval(() => {
                dispatch(action.addWaterAmount(10));
                setCount((prev) => prev + 10);
            }, 0);
            setIntervalId(id);
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
                <span>마신 양 : {water}ml</span>
                <span>
                    남은 양 :{' '}
                    {1500 - water > 0 ? 1500 - water : `+ ${water - 1500}`}ml
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
                {intervalId ? (
                    <CircularProgress sx={{ marginBottom: 30 }} />
                ) : (
                    <button
                        style={{ width: 100, marginRight: 5 }}
                        onClick={() => plusWater(250)}
                    >
                        250ml
                    </button>
                )}
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
                        style={{ width: 100, marginRight: 5 }}
                    >
                        저장
                    </button>
                )}
            </div>
        </>
    );
};

export default Water;
