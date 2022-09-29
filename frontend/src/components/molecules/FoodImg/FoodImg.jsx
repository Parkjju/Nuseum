import { Img, Remove } from '../../pages/Record/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { Image, ImageBox } from '../../pages/Today/Today.style';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useActions from '../../../hooks/useActions';
import axios from 'axios';
import { postActions } from '../../../store/meal-slice/post-slice';

const FoodImg = ({ data, index, isPost, setLoading }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const params = useParams();
    const action = useActions(params.when);

    return (
        <ImageBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                velocity: 1,
            }}
            as={motion.div}
            style={{ backgroundColor: 'transparent' }}
        >
            {data === '' ? null : (
                <Remove
                    onClick={async () => {
                        if (window.confirm('등록한 사진을 삭제하시겠어요?')) {
                            if (!isPost) {
                                try {
                                    setLoading(true);
                                    dispatch(action.removeImage(data.id));
                                    await axios.delete(
                                        `https://nuseum-v2.herokuapp.com/api/v1/consumption/food/image/${data.id}/`,
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        }
                                    );
                                    setLoading(false);
                                    alert('이미지가 삭제되었습니다!');
                                } catch (err) {
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
                                                console.log(
                                                    'response: ',
                                                    response.data
                                                );
                                                const decodedData = jwt_decode(
                                                    response.data.access
                                                );
                                                dispatch(
                                                    authActions.login({
                                                        token: response.data
                                                            .access,
                                                        expiration_time:
                                                            decodedData.exp,
                                                    })
                                                );
                                            })
                                            .catch((err) => {
                                                // 리프레시토큰 만료
                                                if (
                                                    err.response.data
                                                        .messages[0]
                                                        .token_type ===
                                                    'refresh'
                                                ) {
                                                    alert(
                                                        '세션이 만료되었습니다. 다시 로그인해주세요!'
                                                    );
                                                    dispatch(
                                                        authActions.logout()
                                                    );
                                                    navigate('/login');
                                                }
                                                if (
                                                    err.response.data
                                                        ?.detail ===
                                                    'Token is blacklisted'
                                                ) {
                                                    dispatch(
                                                        authActions.logout()
                                                    );
                                                    navigate('/login');
                                                }
                                            });
                                        return;
                                    } else {
                                        alert(
                                            '오류가 발생했습니다. 담당자에게 문의해주세요!'
                                        );
                                    }
                                    setLoading(false);
                                }
                            } else {
                                dispatch(postActions.removePostimage(index));
                                setLoading(false);
                            }
                        }
                    }}
                >
                    <span className='material-symbols-outlined'>close</span>
                </Remove>
            )}

            {data.image ? (
                <Image src={data.image} alt='img' />
            ) : (
                <Image src={data} alt='img' />
            )}
        </ImageBox>
    );
};

export default React.memo(FoodImg);
