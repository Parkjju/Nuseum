import Container from '../../atom/Container';

import { Contents } from '../Home/styled';

import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Slide from './components/Slide';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { fetchCurationList } from '../../../api';
import Table from '../../molecules/Table';

const Curation = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.language.isKorean);

    const token = useSelector((state) => state.auth.token);

    const [recommendList, setRecommendList] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [isNegative, setIsNegative] = useState(true);

    const _ = useQuery(['curationList', token], fetchCurationList, {
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            setRecommendList(response.data.reverse());
        },
        onError: (err) => {
            console.log(err);
            if (err.response.status === 401) {
                return;
            }
            alert(
                lang
                    ? 'An error has occurred. Please contact the developer!'
                    : '오류가 발생했습니다. 담당자에게 문의해주세요!'
            );
        },
    });

    const onClick = useCallback(
        (type) => {
            switch (type) {
                case 'prev':
                    if (visibleIndex === 0) {
                        return;
                    }
                    setVisibleIndex((prev) => prev - 1);
                    return;
                case 'next':
                    if (visibleIndex === recommendList.length - 1) {
                        return;
                    }
                    setVisibleIndex((prev) => prev + 1);
                    return;
            }
        },
        [visibleIndex]
    );

    return (
        <Container>
            <Table></Table>
            {/* <Contents>
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
                                key={recommendData.id}
                                dragSnapToOrigin
                                initial={{ x: isNegative ? -300 : 300 }}
                                animate={{ x: 0 }}
                                transition='none'
                            >
                                <Slide
                                    date={recommendData.created_at}
                                    id={recommendData.id}
                                    setVisibleIndex={onClick}
                                    visibleIndex={visibleIndex}
                                    length={recommendList.length}
                                />
                            </motion.div>
                        ) : null
                    )}
                </AnimatePresence>
            </Contents> */}
        </Container>
    );
};

export default Curation;
