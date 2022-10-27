import Container from '../../atom/Container';
import { AnimatePresence } from 'framer-motion';
import { Contents } from '../Home/styled';

import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import { useState } from 'react';
import { Title } from './Curation.styled';
import Slide from './components/Slide';

const Curation = () => {
    const dispatch = useDispatch();
    const [recommendId, setRecommendId] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const [recommendData, setRecommendData] = useState(null);
    const [currentRecommendIndex, setCurrentRecommendIndex] = useState(-1);

    const [recommendList, setRecommendList] = useState([]);

    const fetchId = async () => {
        try {
            const response = await axios.get('/api/v1/recommendation/user/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setRecommendId(response.data.at(currentRecommendIndex).id);
            setRecommendList(response.data);
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

    useEffect(() => {
        if (recommendList.length === 0) {
            return;
        }

        setRecommendId(recommendList.at(currentRecommendIndex).id);
    }, [currentRecommendIndex]);
    console.log(recommendData);

    return (
        <Container>
            <Contents>
                <AnimatePresence>
                    <Slide
                        setRecommendId={setRecommendId}
                        recommendDataInfo={recommendList}
                        recommendData={recommendData}
                        setCurrentRecommendIndex={setCurrentRecommendIndex}
                    />
                </AnimatePresence>
            </Contents>
        </Container>
    );
};

export default Curation;
