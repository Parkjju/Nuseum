import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { fetchDailyNutrient } from '../../../api';
import useCalculate from '../../../hooks/useCalculate';
import Container from '../../atom/Container';
import Table from '../../molecules/Table';

const Curation = () => {
    const range = useCalculate('M', 3);
    const [isSelected, setIsSelected] = useState([false, false]);
    let curationData = {
        '0.0': {
            고사리: 0,
            취나물: 0,
            우거지: 0,
            애호박: 0,
            상추: 0,
            양배추: 0,
            토마토: 0,
        },
        '3.0': {
            고춧잎: 0,
            시금치: 0,
        },
        '4.0': {
            고춧잎: 0,
            취나물: 0,
            시금치: 0,
            무청: 0,
            깻잎: 0,
            당근: 0,
            상추: 0,
        },
        '5.0': {
            고춧잎: 0,
        },
        '6.0': {
            취나물: 0,
            우거지: 0,
            시금치: 0,
            깻잎: 0,
            고구마: 0,
            상추: 0,
        },
        '8.0': {
            마늘: 0,
        },
        0.1: {
            아보카도: 0,
            배: 0,
            블루베리: 0,
            참외: 0,
            포도: 0,
            사과: 0,
            키위: 0,
        },
        3.1: {
            바나나: 0,
        },
        6.1: {
            딸기: 0,
        },
        8.1: {
            아보카도: 0,
        },
        0.2: {
            대두: 0,
            강낭콩: 0,
        },
        3.2: {
            대두: 0,
            두부: 0,
        },
        5.2: {
            대두: 0,
            유부: 0,
        },
        6.2: {
            대두: 0,
        },
        0.3: {
            보리: 0,
            귀리: 0,
            현미: 0,
            호밀빵: 0,
            그래놀라: 0,
        },
        3.3: {
            현미: 0,
            보리: 0,
            호밀빵: 0,
            그래놀라: 0,
        },
        5.3: {
            보리: 0,
        },
        6.3: {
            현미: 0,
            그래놀라: 0,
        },
        0.4: {
            느타리버섯: 0,
            목이버섯: 0,
            표고버섯: 0,
            새송이버섯: 0,
        },
        1.4: {
            느타리버섯: 0,
            표고버섯: 0,
            양송이버섯: 0,
            새송이버섯: 0,
            목이버섯: 0,
        },
        6.4: {
            느타리버섯: 0,
            양송이버섯: 0,
        },
        8.4: {
            느타리버섯: 0,
            표고버섯: 0,
            새송이버섯: 0,
        },
        0.5: {
            김: 0,
            미역: 0,
        },
        2.5: {
            김: 0,
            미역: 0,
        },
        3.5: {
            미역: 0,
            김: 0,
        },
        4.5: {
            파래: 0,
            김: 0,
        },
        5.5: {
            매생이: 0,
        },
        6.5: {
            김: 0,
            미역: 0,
        },
        7.5: {
            김: 0,
        },
        8.5: {
            김: 0,
        },
        3.6: {
            호박씨: 0,
            참깨: 0,
            브라질너트: 0,
            아몬드: 0,
            들깨: 0,
        },
        5.6: {
            호박씨: 0,
            캐슈넛: 0,
        },
        8.6: {
            피스타치오넛: 0,
            해바라기씨: 0,
        },
        1.7: {
            연어: 0,
            달걀: 0,
            멸치: 0,
            꽁치: 0,
            전갱이: 0,
            조기: 0,
            오징어: 0,
            임연수어: 0,
        },
        2.7: {
            고등어: 0,
            멸치: 0,
            꽁치: 0,
            전갱이: 0,
            임연수어: 0,
            삼치: 0,
            연어: 0,
            조기: 0,
            오징어: 0,
        },
        3.7: {
            멸치: 0,
        },
        4.7: {
            장어: 0,
            메추리알: 0,
            달걀: 0,
        },
        5.7: {
            멸치: 0,
            북어: 0,
            '돼지고기 등심': 0,
            '돼지고기 안심': 0,
            '소고기 사태': 0,
            '소고기 등심': 0,
            '소고기 안심': 0,
            새우: 0,
            닭고기: 0,
            달걀: 0,
            오징어: 0,
        },
        6.7: {
            달걀: 0,
        },
        7.7: {
            바지락: 0,
            꼬막: 0,
            백합: 0,
            굴: 0,
            멸치: 0,
            가리비: 0,
            고등어: 0,
            꽁치: 0,
            연어: 0,
            오징어: 0,
            메추리알: 0,
            오리고기: 0,
        },
        8.7: {
            꽁치: 0,
            연어: 0,
        },
        4.8: {
            우유: 0,
        },
        5.8: {
            치즈: 0,
        },
    };

    const lang = useSelector((state) => state.language.isKorean);
    const token = useSelector((state) => state.auth.token);
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
            case 'dietary_fiber':
                return 0;
            case 'vitamin_d':
                return 1;
            case 'dha_epa':
                return 2;
            case 'magnesium':
                return 3;
            case 'vitamin_a':
                return 4;
            case 'tryptophan':
                return 5;
            case 'folic_acid':
                return 6;
            case 'vitamin_b12':
                return 7;
            case 'vitamin_b6':
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
        ['dailyNutrient', midnight.getTime(), 'week', token],
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
                        key === 'protein' ||
                        key === 'energy'
                    )
                        continue;
                    console.log(key);
                    if (response.data[key] < range[key] * 7) {
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

    return (
        <Container>
            <Table
                // isSelected={isSelected[0]}
                curationData={curationData}
                inSufficientDiversity={inSufficientDiversity}
                inSufficientNutrition={inSufficientNutrition}
            ></Table>
            {/* <ButtonBox style={{ margin: '0 auto', justifyContent: 'center' }}>
                <FetchButton
                    onClick={() => {
                        if (isSelected[0]) {
                            return;
                        } else {
                            setIsSelected([true, false]);
                        }
                    }}
                    isClicked={isSelected[0]}
                >
                    <span>{lang ? 'Weekly Nutrients' : '한 주 데이터로'}</span>
                    <span>{lang ? '' : '추천받기'}</span>
                </FetchButton>
                <FetchButton
                    onClick={() => {
                        setIsSelected([false, true]);
                    }}
                    isClicked={isSelected[1]}
                >
                    <span>{lang ? 'Monthly Nutrients' : '한 달'}</span>
                    <span>{lang ? '' : '섭취 영양소'}</span>
                </FetchButton>
            </ButtonBox> */}
        </Container>
    );
};

export default Curation;
