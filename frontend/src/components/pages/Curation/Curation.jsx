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
            '고사리\n(42)': 0,
            '취나물\n(38.5)': 0,
            '우거지\n(29.6)': 0,
            '애호박\n(19.9)': 0,
            '상추\n(3.9)': 0,
            '양배추\n(2.7)': 0,
            '토마토\n(2.6)': 0,
        },
        '3.0': {
            '고춧잎\n(607)': 0,
            '시금치\n(84)': 0,
        },
        '4.0': {
            '고춧잎\n(2116.75)': 0,
            '취나물\n(1734.58)': 0,
            '깻잎\n(630.417)': 0,
            '시금치\n(587.583)': 0,
            '당근\n(459.667)': 0,
            '무청\n(417.083)': 0,
            '상추\n(239.333)': 0,
        },
        '5.0': {
            '고춧잎\n(483)': 0,
        },
        '6.0': {
            '취나물\n(456)': 0,
            '우거지\n(308)': 0,
            '시금치\n(272)': 0,
            '깻잎\n(150)': 0,
            '고구마\n(90)': 0,
            '상추\n(64)': 0,
        },
        '8.0': {
            '마늘\n(1.275)': 0,
        },
        0.1: {
            '아보카도\n(5.3)': 0,
            '배\n(3.3)': 0,
            '블루베리\n(3)': 0,
            '참외\n(2.9)': 0,
            '사과\n(2.7)': 0,
            '키위\n(2.6)': 0,
            '포도\n(2.2)': 0,
        },
        3.1: {
            '바나나\n(28)': 0,
        },
        6.1: {
            '딸기\n(54)': 0,
        },
        8.1: {
            '아보카도\n(0.32)': 0,
        },
        0.2: {
            '대두\n(25.6)': 0,
            '강낭콩\n(15.2)': 0,
        },
        3.2: {
            '대두\n(257)': 0,
            '두부\n(80)': 0,
        },
        5.2: {
            '대두\n(423)': 0,
            '유부\n(390)': 0,
        },
        6.2: {
            '대두\n(485)': 0,
        },
        0.3: {
            
            '보리\n(20.8)': 0,
            '귀리\n(18.8)': 0,
            '현미\n(7.6)': 0,            
            '호밀빵\n(5.6)': 0,            
            '그래놀라\n(4.7)': 0,
        },
        3.3: {            
            '현미\n(113)': 0,            
            '보리\n(72)': 0,            
            '호밀빵\n(40)': 0,            
            '그래놀라\n(32)': 0,
        },
        5.3: {
            '보리\n(171)': 0,
        },
        6.3: {
            '그래놀라\n(570)': 0,
            '현미\n(57)': 0,
        },
        0.4: {
            '느타리버섯\n(57.2)': 0,
            '목이버섯\n(53)': 0,
            '표고버섯\n(39.1)': 0,
            '새송이버섯\n(31)': 0,
        },
        1.4: {
            '느타리버섯\n(644.73)': 0,
            '표고버섯\n(77.59)': 0,
            '양송이버섯\n(68.81)': 0,
            '새송이버섯\n(62.33)': 0,
            '목이버섯\n(9.26)': 0,
        },
        6.4: {
            '느타리버섯\n(743)': 0,
            '양송이버섯\n(284)': 0,
        },
        8.4: {
            '느타리버섯\n(2.05)': 0,
            '표고버섯\n(1.931)': 0,
            '새송이버섯\n(1.209)': 0,
        },
        0.5: {
            '김\n(45.6)': 0,
            '미역\n(35.6)': 0,
        },
        2.5: {
            '김\n(1219.8)': 0,
            '미역\n(858.08)': 0,
        },
        3.5: {
            '미역\n(901)': 0,
            '김\n(350)': 0,
        },
        4.5: {
            '파래\n(1437)': 0,
            '김\n(1291)': 0,
        },
        5.5: {
            '매생이\n(420)': 0,
        },
        6.5: {
            '김\n(1155)': 0,
            '미역\n(283)': 0,
        },
        7.5: {
            '김\n(71.88)': 0,
        },
        8.5: {
            '김\n(0.988)': 0,
        },
        3.6: {
            '호박씨\n(503)': 0,
            '참깨\n(406)': 0,
            '브라질너트\n(376)': 0,
            '아몬드\n(335)': 0,
            '들깨\n(315)': 0,
        },
        5.6: {
            '호박씨\n(476)': 0,
            '캐슈넛\n(360)': 0,
        },
        8.6: {
            '피스타치오넛\n(1.7)': 0,
            '해바라기씨\n(1.358)': 0,
        },
        1.7: {
            '연어\n(38.4)': 0,
            '달걀\n(20.9)': 0,
            '멸치\n(17.22)': 0,
            '꽁치\n(13)': 0,
            '전갱이\n(11.7)': 0,
            '조기\n(8.42)': 0,
            '오징어\n(6.03)': 0,
            '임연수어\n(4.6)': 0,
        },
        2.7: {
            '고등어\n(5300)': 0,
            '멸치\n(2452.89)': 0,
            '꽁치\n(2155.56)': 0,
            '전갱이\n(1860)': 0,
            '임연수어\n(1700)': 0,
            '삼치\n(1560)': 0,
            '연어\n(1330)': 0,
            '조기\n(850.9)': 0,
            '오징어\n(779)': 0,
        },
        3.7: {
            '멸치\n(338)': 0,
        },
        4.7: {
            '장어\n(1137)': 0,
            '메추리알\n(194)': 0,
            '달걀\n(136)': 0,
        },
        5.7: {
            '멸치\n(750)': 0,
            '북어\n(652)': 0,
            '돼지고기 등심\n(415)': 0,
            '소고기 사태\n(377)': 0,
            '돼지고기 안심\n(344)': 0,
            '닭고기\n(332)': 0,
            '소고기 등심\n(270)': 0,
            '새우\n(197)': 0,
            '소고기 안심\n(174)': 0,
            '달걀\n(194)': 0,
            '오징어\n(122)': 0,
        },
        6.7: {
            '달걀\n(160)': 0,
        },
        7.7: {
            '바지락\n(74.01)': 0,
            '꼬막\n(45.9)': 0,
            '백합\n(33.4)': 0,
            '굴\n(28.41)': 0,
            '멸치\n(25.44)': 0,
            '가리비\n(22.9)': 0,
            '고등어\n(21.9)': 0,
            '꽁치\n(16.3)': 0,
            '연어\n(9.4)': 0,
            '오징어\n(4.37)': 0,
            '메추리알\n(3.79)': 0,
            '오리고기\n(3.41)': 0,
        },
        8.7: {
            '연어\n(0.56)': 0,
            '꽁치\n(0.42)': 0,
        },
        4.8: {
            '우유\n(55)': 0,
        },
        5.8: {
            '치즈\n(408)': 0,
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
        // switch (name) {
        //     case 'dha_epa':
        //         return 0;
        //     case 'vitamin_a':
        //         return 1;
        //     case 'magnesium':
        //         return 2;
        //     case 'tryptophan':
        //         return 3;
        //     case 'vitamin_b6':
        //         return 4;
        //     case 'vitamin_b12':
        //         return 5;
        //     case 'folic_acid':
        //         return 6;
        //     case 'vitamin_d':
        //         return 7;
        //     case 'dietary_fiber':
        //         return 8;
        //     default:
        //         return null;
        // }
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
