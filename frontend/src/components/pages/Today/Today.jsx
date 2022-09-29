import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Contents } from '../Home/styled';
import { Tag, TagBox } from '../Record/styled';
import { Box, Gauge } from '../Water/Water.style';
import {
    Image,
    ImageBox,
    Summary,
    SummaryTitle,
    VerticalImageBox,
} from './Today.style';
import jwt_decode from 'jwt-decode';
import { authActions } from '../../../store/auth-slice';

const Today = ({ date }) => {
    const token = useSelector((state) => state.auth.token);

    const username = localStorage.getItem('username');
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [foodTag, setFoodTag] = useState([]);
    const params = useParams();
    const [supplementInformation, setSupplementInformation] = useState([]);
    // 이미지는 한번에 , 순서없이 나열만 진행
    const [mealImages, setMealImages] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
    });
    const [boxWidth, setBoxWidth] = useState(
        window.innerWidth > 800 ? 800 * 0.8 : window.innerWidth * 0.8
    );
    window.onresize = () => {
        setBoxWidth(boxRef.current.clientWidth);
    };

    window.onload = () => {
        setBoxWidth(boxRef.current.clientWidth);
    };
    const boxRef = useRef();
    const [waterAmount, setWaterAmount] = useState(0);

    const [supplementImages, setSupplementImages] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://nuseum-v2.herokuapp.com/api/v1/consumption/today/?date=${date}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                setMealImages(() => {
                    return {
                        breakfast: [...response.data.breakfast.image],
                        lunch: [...response.data.lunch.image],
                        dinner: [...response.data.dinner.image],
                        snack: [...response.data.snack.image],
                    };
                });
                setSupplementImages(() => {
                    let copy = [];
                    for (let obj of response.data.supplement) {
                        copy.push(obj.image);
                    }
                    return copy;
                });
                setWaterAmount(response.data.water[0].amount);
                setFoodTag(() => {
                    let copy = [];
                    for (let key in response.data) {
                        if (key === 'supplement' || key === 'water') continue;
                        copy.push(...response.data[key].data);
                    }
                    return copy;
                });
                setSupplementInformation(() => {
                    if (response.data.supplement.length === 0) {
                        return [];
                    }
                    let copy = [];
                    for (let obj of response.data.supplement) {
                        copy.push(obj);
                    }
                    return copy;
                });
                setLoading(false);
            })
            .catch((err) => {
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
                        })
                        .catch((err) => {
                            console.log(err);
                            // 리프레시토큰 만료
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
                        });
                    return;
                } else {
                    alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                }
                setLoading(false);
            });
    }, [username, date]);

    return loading ? (
        <CircularProgress />
    ) : (
        <Contents>
            <VerticalImageBox>
                {Object.values(mealImages).map((arr) =>
                    arr.map((item, index) => (
                        <ImageBox key={index}>
                            <Image src={item.image} />
                        </ImageBox>
                    ))
                )}
                {supplementImages.map((item, index) => (
                    <ImageBox key={index}>
                        <Image src={item} />
                    </ImageBox>
                ))}
            </VerticalImageBox>
            <Summary>
                <SummaryTitle>오늘 먹은 음식</SummaryTitle>
                <TagBox
                    style={{ width: '80%', padding: '0px 30px', marginTop: 30 }}
                >
                    {foodTag.map((item, index) => (
                        <Tag
                            key={index}
                        >{`${item.name} ${item.amount}g 또는 ml`}</Tag>
                    ))}
                </TagBox>
                <SummaryTitle>영양제</SummaryTitle>
                <TagBox style={{ padding: '0px 30px', marginTop: 30 }}>
                    {supplementInformation.map((item, index) => (
                        <Tag
                            key={index}
                        >{`${item.manufacturer} ${item.name}`}</Tag>
                    ))}
                </TagBox>
                <SummaryTitle>오늘 섭취한 물의 양</SummaryTitle>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '90%',
                        margin: '30px auto',
                        fontSize: 14,
                    }}
                >
                    <span>마신 양 : {waterAmount}ml</span>
                    <span>
                        남은 양 :{' '}
                        {2000 - waterAmount > 0
                            ? 2000 - waterAmount
                            : `+ ${waterAmount - 2000}`}
                        ml
                    </span>
                </div>
                <Box
                    ref={boxRef}
                    style={{
                        width: '90%',
                        margin: '0px auto',
                        paddingBottom: 30,
                    }}
                >
                    <Gauge water={waterAmount} maxWidth={boxWidth} />
                </Box>
            </Summary>
        </Contents>
    );
};

export default Today;
