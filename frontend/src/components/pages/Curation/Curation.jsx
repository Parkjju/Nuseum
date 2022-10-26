import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import CurationData from './CurationData';
import avoid from '../../../assets/curation/avoid.png';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import { useState } from 'react';
import {
    CommentBox,
    CurationDataWrapper,
    CurationTypeImage,
    Title,
    WarningBox,
    WarningFood,
    WarningList,
    WarningMain,
    WarningTitle,
} from './Curation.styled';

const Curation = () => {
    const dispatch = useDispatch();
    const [recommendId, setRecommendId] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const [recommendData, setRecommendData] = useState(null);

    const fetchId = async () => {
        try {
            const response = await axios.get('/api/v1/recommendation/user/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('추천 결과들', response);
            setRecommendId(response.data[0].id);
        } catch (err) {
            console.log(err);
            if (!recommendId) return;
            if (err.response?.status === 401) {
                const { exp, token } = await handleExpired();
                dispatch(
                    authActions.login({
                        token: token.data.access,
                        exp,
                    })
                );
            } else {
                if (!recommendId) return;
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            }
        }
    };

    const fetchRecommend = async () => {
        try {
            const response = await axios.get(
                `/api/v1/recommendation/user/${recommendId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setRecommendData(response.data);
        } catch (err) {
            console.log(err);
            if (!recommendId) return;
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
        }
    };

    useEffect(() => {
        fetchId();
    }, []);
    useEffect(() => {
        fetchRecommend();
    }, [recommendId]);
    return (
        <Container>
            <Contents>
                <Title>피해야 할 식품</Title>
                <WarningBox>
                    <WarningTitle>
                        <CurationTypeImage src={avoid} alt='피해야할 음식' />
                        <WarningMain>
                            {
                                recommendData?.data
                                    .filter((item) => item.type === '주의')[0]
                                    .main.split('(')[0]
                            }

                            {recommendData?.data
                                .filter((item) => item.type === '주의')[0]
                                .main.split('(')[1]
                                ? `\n(${
                                      recommendData?.data
                                          .filter(
                                              (item) => item.type === '주의'
                                          )[0]
                                          .main.split('(')[1]
                                  }`
                                : null}
                        </WarningMain>
                    </WarningTitle>
                    <WarningList>
                        {recommendData?.data
                            .filter((item) => item.type === '주의')[0]
                            .list.map((food, index) => (
                                <WarningFood key={index}>{food}</WarningFood>
                            ))}
                    </WarningList>
                </WarningBox>
                {console.log(
                    recommendData?.data.filter((item) => item.type === '주의')
                )}

                <Title>내 아이 맞춤식품</Title>
                <CurationDataWrapper rows={recommendData?.data.length / 2}>
                    {recommendData?.data.map((item, index) => (
                        <CurationData data={item} key={index} />
                    ))}
                </CurationDataWrapper>
                <CommentBox>{recommendData?.comment}</CommentBox>
            </Contents>
        </Container>
    );
};

export default Curation;
