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
import handleExpired from '../../../helpers/handleExpired';

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
        // if (initial) {
        //     initial = false;
        //     return;
        // } else {
        //     initial = true;
        // }
        setLoading(true);
        axios
            .get(`/api/v1/consumption/water/?date=${params.date}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                if (response.data.length === 0) {
                    setLoading(false);
                    return;
                }

                dispatch(action.addWaterAmount(response.data[0].amount));
                dispatch(action.getId(response.data[0].id));
                setLoading(false);
            })
            .catch(async (err) => {
                console.log(err);
                if (err.response.status === 401) {
                    const { exp, token } = await handleExpired();
                    dispatch(
                        authActions.login({
                            token: token.data.access,
                            exp,
                        })
                    );
                } else {
                    alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                }
                setLoading(false);
            });
    }, [dispatch, token]);

    useEffect(() => {
        if (count >= currentAmount) {
            clearInterval(intervalId);
            setCount(0);
            setCurrentAmount(0);
            setIntervalId(null);
        }
    }, [water, count, currentAmount, intervalId, params.date]);

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
            alert('수분 입력이 완료되었습니다!');
            setLoading(false);
        } catch (err) {
            if (err.response.status === 401) {
                const { exp, token } = await handleExpired();
                dispatch(
                    authActions.login({
                        token: token.data.access,
                        exp,
                    })
                );
            } else {
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            }
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
                dispatch(action.addWaterAmount(50));
                setCount((prev) => prev + 50);
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
