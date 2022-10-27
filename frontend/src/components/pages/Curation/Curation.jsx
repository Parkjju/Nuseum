import Container from '../../atom/Container';

import { Contents } from '../Home/styled';

import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import { useState } from 'react';
import { Title } from './Curation.styled';
import Slide from './components/Slide';
import { AnimatePresence, motion } from 'framer-motion';

const Curation = () => {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);

    const [recommendList, setRecommendList] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [isNegative, setIsNegative] = useState(true);

    const fetchId = async () => {
        try {
            const response = await axios.get('/api/v1/recommendation/user/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setRecommendList(response.data);
        } catch (err) {
            console.log(err);
            if (err.response?.status === 401) {
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

    const setNextPage = (event, info) => {
        if (info.offset.x < -200) {
            if (visibleIndex === 0) {
                return;
            }
            setIsNegative(false);
            setVisibleIndex((prev) => prev - 1);
            console.log('prev!');
        } else if (info.offset.x > 200) {
            if (visibleIndex === recommendList.length - 1) {
                return;
            }
            setIsNegative(true);
            setVisibleIndex((prev) => prev + 1);
            console.log('next!');
        } else {
            console.log('no changes!');
        }
    };

    useEffect(() => {
        fetchId();
    }, []);

    return (
        <Container>
            <Contents>
                <AnimatePresence>
                    {recommendList.map((recommendData) =>
                        recommendList.indexOf(recommendData) ===
                        visibleIndex ? (
                            <motion.div
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                                drag='x'
                                onDragEnd={setNextPage}
                                key={recommendData.id}
                                dragSnapToOrigin
                                initial={{ x: isNegative ? -300 : 300 }}
                                animate={{ x: 0 }}
                                transition='none'
                            >
                                <Slide
                                    date={recommendData.created_at}
                                    id={recommendData.id}
                                />
                            </motion.div>
                        ) : null
                    )}
                </AnimatePresence>
            </Contents>
        </Container>
    );
};

export default Curation;
