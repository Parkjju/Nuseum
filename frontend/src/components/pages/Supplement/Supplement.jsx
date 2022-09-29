import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { authActions } from '../../../store/auth-slice';
import { CircularProgress } from '@mui/material';
import { supplementActions } from '../../../store/supplement-slice';
import ImageCard from '../../molecules/ImageCard';

let initial = true;
const Supplement = () => {
    const [isRequestSent, setIsRequestSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetchedSupplement, setFetchedSupplement] = useState([]);
    const supplementData = useSelector((state) => state.supplement.data);
    const token = useSelector((state) => state.auth.token);
    const addSupplement = () => {
        dispatch(
            supplementActions.getData([
                {
                    image: '',
                    name: '',
                    manufacturer: '',
                },
            ])
        );
    };

    const isEmptyFieldExistsInSupplement = () => {
        for (let obj of supplementData) {
            for (let key of Object.keys(obj)) {
                if (key === 'image') continue;
                if (obj[key] === '') {
                    return true;
                }
            }
        }
        return false;
    };
    const saveSupplement = async () => {
        if (isEmptyFieldExistsInSupplement()) {
            alert('제조사와 영양제 이름, 이미지는 필수 입력입니다!');
            return;
        }
        try {
            setLoading(true);
            await axios.post(
                'https://nuseum-v2.herokuapp.com/api/v1/consumption/supplement/',
                {
                    type: 'supplement',
                    created_at: param.date,
                    consumptions: supplementData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('일기 저장이 완료되었습니다!');
            dispatch(supplementActions.checkDataSaved());
            setIsRequestSent(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (err.response.status === 401) {
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
                        const decodedData = jwt_decode(response.data.access);
                        dispatch(
                            authActions.login({
                                token: response.data.access,
                                expiration_time: decodedData.exp,
                            })
                        );
                        setLoading(false);
                    })
                    .catch((err) => {
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
                            err.response.data?.detail === 'Token is blacklisted'
                        ) {
                            dispatch(authActions.logout());
                            navigate('/login');
                        }
                        setLoading(false);
                    });
            } else {
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            }
            setIsRequestSent(false);
            setLoading(false);
        }
    };
    const param = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        // if (initial) {
        //     initial = false;
        //     return;
        // } else {
        // }
        setLoading(true);
        axios
            .get(
                `https://nuseum-v2.herokuapp.com/api/v1/consumption/supplement/?date=${param.date}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.length === 0) {
                    setLoading(false);
                    return;
                }
                if (response.data?.consumptions.length > 0) {
                    setFetchedSupplement(response.data.consumptions);
                }
                dispatch(supplementActions.removeAll());
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
                        })
                        .catch((err) => {
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
    }, [isRequestSent, dispatch]);

    return loading ? (
        <CircularProgress />
    ) : (
        <>
            <button onClick={addSupplement} style={{ marginBottom: 20 }}>
                추가하기
            </button>

            {fetchedSupplement.length === 0
                ? null
                : fetchedSupplement.map((item, index) =>
                      Object.keys(item).length === 0 ? null : (
                          <ImageCard
                              isSaved={item?.saved}
                              index={index}
                              key={index}
                              data={item}
                              setFetchedSupplement={setFetchedSupplement}
                          />
                      )
                  )}
            {supplementData.length === 0
                ? null
                : supplementData.map((item, index) =>
                      Object.keys(item).length === 0 ? null : (
                          <ImageCard
                              isSaved={item?.saved}
                              index={index}
                              key={index}
                              data={item}
                          />
                      )
                  )}

            {loading ? (
                <CircularProgress sx={{ marginBottom: 5 }} />
            ) : (
                <button
                    // 영양제 저장하는 버튼이었음
                    onClick={() => saveSupplement()}
                    style={{ marginBottom: '30px' }}
                >
                    저장
                </button>
            )}
        </>
    );
};
export default Supplement;
