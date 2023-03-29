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
    fetchDailyNutrient,
    fetchDailyNutritionAndCategory,
} from '../../../api';
import Table from '../../molecules/Table';
import useCalculate from '../../../hooks/useCalculate';

const Curation = () => {
    const range = useCalculate('M', 3);
    let curationData = {
        '5.0': {
            건미역: 0,
            김: 0,
        },
        '7.0': {
            고등어: 0,
            꽁치: 0,
            임연수어: 0,
            참다랑어: 0,
            오징어: 0,
        },
        0.1: {
            들깻잎: 0,
            시금치: 0,
            당근: 0,
            상추: 0,
            부추: 0,
            수박: 0,
            무청: 0,
            고구마: 0,
            토마토: 0,
        },
        5.1: {
            건미역: 0,
            김: 0,
        },
        7.1: {
            장어: 0,
            달걀: 0,
            닭고기: 0,
            돼지고기: 0,
        },
        0.2: {
            들깻잎: 0,
            시금치: 0,
            감자: 0,
            고구마: 0,
            콩나물: 0,
        },
        1.2: {
            바나나: 0,
        },
        2.2: {
            두부: 0,
            대두: 0,
        },
        3.2: {
            현미: 0,
            보리: 0,
        },
        5.2: {
            건미역: 0,
        },
        7.2: {
            멸치: 0,
            닭고기: 0,
            돼지고기: 0,
            소고기: 0,
            달걀: 0,
        },
        8.2: {
            우유: 0,
        },
        2.3: {
            대두: 0,
        },
        3.3: {
            보리: 0,
        },
        7.3: {
            새우: 0,
            고등어: 0,
            닭고기: 0,
            달걀: 0,
            돼지고기: 0,
            소고기: 0,
            오징어: 0,
            멸치: 0,
        },
        0.4: {
            아보카도: 0,
        },
        1.4: {
            리치: 0,
            무화과: 0,
            코코넛: 0,
        },
        6.4: {
            해바라기씨: 0,
            아마씨: 0,
            캐슈넛: 0,
        },
        7.4: {
            꽁치: 0,
            연어: 0,
            임연수어: 0,
            새우: 0,
            문어: 0,
            미꾸라지: 0,
        },
        5.5: {
            매생이: 0,
            김: 0,
        },
        7.5: {
            바지락: 0,
            꼬막: 0,
            굴: 0,
            가리비: 0,
            꽁치: 0,
            고등어: 0,
            연어: 0,
            미꾸라지: 0,
            멸치: 0,
            오징어: 0,
            게: 0,
            조기: 0,
            오리고기: 0,
            새우: 0,
            소고기: 0,
            달걀: 0,
            돼지고기: 0,
            닭고기: 0,
        },
        8.5: {
            우유: 0,
            요거트: 0,
        },
        1.6: {
            딸기: 0,
            감: 0,
        },
        2.6: {
            대두: 0,
            두부: 0,
        },
        3.6: {
            현미: 0,
        },
        5.6: {
            김: 0,
        },
        7.6: {
            달걀: 0,
        },
        7.7: {
            연어: 0,
            달걀: 0,
            꽁치: 0,
            전갱이: 0,
            조기: 0,
            오징어: 0,
            미꾸라지: 0,
        },
        8.7: {
            두유: 0,
        },
        0.8: {
            토마토: 0,
            상추: 0,
            감자: 0,
            당근: 0,
            양배추: 0,
        },
        1.8: {
            감: 0,
            복숭아: 0,
            귤: 0,
            사과: 0,
        },
        2.8: {
            대두: 0,
            두부: 0,
        },
        3.8: {
            보리: 0,
            현미: 0,
        },
        5.8: {
            건미역: 0,
        },
    };

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

    // 배열형태의 키값을 만들어줄 예정
    // N x N 형태의 좌표 조합이 만들어짐. 크로스되는 지점의 음식들을 추천하게 됨
    const [inSufficientNutrition, setInSufficientNutrition] = useState([]);
    const [inSufficientDiversity, setInSufficientDiversity] = useState([]);

    const mappingNutritionNameToCoordinate = (name) => {
        switch (name) {
            case 'dha_epa':
                return 0;
            case 'vitamin_a':
                return 1;
            case 'magnesium':
                return 2;
            case 'tryptophan':
                return 3;
            case 'vitamin_b6':
                return 4;
            case 'vitamin_b12':
                return 5;
            case 'folic_acid':
                return 6;
            case 'vitamin_d':
                return 7;
            case 'dietary_fiber':
                return 8;
            default:
                return null;
        }
    };

    let category = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [nutritionData, setNutritionData] = useState({
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        dietary_fiber: 0,
        magnesium: 0,
        vitamin_a: 0,
        vitamin_d: 0,
        vitamin_b6: 0,
        folic_acid: 0,
        vitamin_b12: 0,
        tryptophan: 0,
        dha_epa: 0,
    });

    const _ = useQuery(
        ['dailyNutrient', midnight.getTime(), token],
        fetchDailyNutrient,
        {
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                for (let key in nutritionData) {
                    setNutritionData((prev) => {
                        prev[key] = response.data[key];
                        return { ...prev };
                    });
                }

                for (let key in range) {
                    if (
                        key === 'carbohydrate' ||
                        key === 'fat' ||
                        key === 'protein'
                    )
                        continue;
                    if (response.data[key] < range[key]) {
                        setInSufficientNutrition((prev) => [
                            ...prev,
                            mappingNutritionNameToCoordinate(key),
                        ]);
                    }
                }

                for (let value of category) {
                    if (response.data.category.includes(value)) {
                        continue;
                    } else {
                        setInSufficientDiversity((prev) => [
                            ...prev,
                            value - 1,
                        ]);
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

    console.log(inSufficientDiversity);
    return (
        <Container>
            <Table
                curationData={curationData}
                inSufficientDiversity={inSufficientDiversity}
                inSufficientNutrition={inSufficientNutrition}
            ></Table>
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
