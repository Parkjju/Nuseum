import Container from '../../atom/Container';

import { Contents } from '../Home/styled';

import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Slide from './components/Slide';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import {
    fetchCurationList,
    fetchDailyNutritionAndCategory,
} from '../../../api';
import Table from '../../molecules/Table';

const Curation = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.language.isKorean);

    const token = useSelector((state) => state.auth.token);
    const username = localStorage.getItem('username');
    const now = new Date();
    const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0 // 시, 분, 초는 모두 0으로 설정합니다.
    );

    const [recommendList, setRecommendList] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [isNegative, setIsNegative] = useState(true);

    // 배열형태의 키값을 만들어줄 예정
    // N x N 형태의 좌표 조합이 만들어짐. 크로스되는 지점의 음식들을 추천하게 됨
    const [inSufficientNutrition, setInSufficientNutrition] = useState([]);
    const [inSufficientDiversity, setInSufficientDiversity] = useState([]);

    let range = {
        dietary_fiber: null, // 식이섬유
        magnesium: null, // 마그네슘
        vitamin_a: null, // 비타민 A
        vitamin_d: null, // 비타민 D
        vitamin_b6: null, // 비타민 B6
        folic_acid: null, // 엽산
        vitamin_b12: null, // 비타민 B12
        tryptophan: null, // 트립토판
        dha_epa: null, // DHA+EPA
    };
    let category = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    range.dietary_fiber = 20;
    range.magnesium = 110;
    range.vitamin_a = 300;
    range.vitamin_d = 5;
    range.vitamin_b6 = 0.7;
    range.vitamin_b12 = 1.1;
    range.folic_acid = 180;
    range.tryptophan = 0.1;
    range.dha_epa = 300;

    // const _ = useQuery(['curationList', token], fetchCurationList, {
    //     refetchOnWindowFocus: false,
    //     onSuccess: (response) => {
    //         setRecommendList(response.data.reverse());
    //     },
    //     onError: (err) => {
    //         console.log(err);
    //         if (err.response.status === 401) {
    //             return;
    //         }
    //         alert(
    //             lang
    //                 ? 'An error has occurred. Please contact the developer!'
    //                 : '오류가 발생했습니다. 담당자에게 문의해주세요!'
    //         );
    //     },
    // });

    // const onClick = useCallback(
    //     (type) => {
    //         switch (type) {
    //             case 'prev':
    //                 if (visibleIndex === 0) {
    //                     return;
    //                 }
    //                 setVisibleIndex((prev) => prev - 1);
    //                 return;
    //             case 'next':
    //                 if (visibleIndex === recommendList.length - 1) {
    //                     return;
    //                 }
    //                 setVisibleIndex((prev) => prev + 1);
    //                 return;
    //         }
    //     },
    //     [visibleIndex]
    // );

    const _ = useQuery(
        ['dailyNutritionAndCategory', username, midnight.getTime(), token],
        fetchDailyNutritionAndCategory,
        {
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                console.log(response.data);
                for (let key in range) {
                    if (response.data[key] < range[key]) {
                        setInSufficientNutrition((prev) => [...prev, key]);
                    }
                }
                console.log(response.data.category.includes(8));
                for (let value of category) {
                    if (response.data.category.includes(value)) {
                        continue;
                    } else {
                        setInSufficientDiversity((prev) => [...prev, value]);
                    }
                }
            },
            onError: (err) => {
                if (err.response.status === 401) {
                    return;
                }
                alert(
                    lang
                        ? 'An error has occurred. Please contact the developer!'
                        : '오류가 발생했습니다. 담당자에게 문의해주세요!'
                );
            },
        }
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
