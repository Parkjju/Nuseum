import { useState } from 'react';
import { Name } from '../../atom/Card/styled';
import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { DiaryTitle } from '../Record/styled';
import * as S from './Analysis.style';
// import carbohydrates from '../../../assets/carbohydrates.png';
// import dha from '../../../assets/dha.png';
// import fat from '../../../assets/fat.png';
// import folic from '../../../assets/folic.png';
// import magnesium from '../../../assets/magnesium.png';
// import protein from '../../../assets/proteins.png';
// import tryptophan from '../../../assets/tryptophan.png';
// import vitaminA from '../../../assets/vitamin-a.png';
// import vitaminB6 from '../../../assets/vitamin-b6.png';
// import fiber from '../../../assets/vegetables.png';
// import vitaminB12 from '../../../assets/vitamin-b12.png';
// import vitaminD from '../../../assets/vitamin-d.png';
import a from '../../../assets/category/1.png';
import b from '../../../assets/category/2.png';
import c from '../../../assets/category/3.png';
import d from '../../../assets/category/4.png';
import e from '../../../assets/category/5.png';
import f from '../../../assets/category/6.png';
import g from '../../../assets/category/7.png';
import h from '../../../assets/category/8.png';
import i from '../../../assets/category/9.png';

import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale,
    BarElement,
    Title,
    LinearScale,
} from 'chart.js';
import RadarGraph from '../../molecules/RadarGraph';
import BarGraph from '../../molecules/BarGraph';
ChartJS.register(
    RadialLinearScale,
    CategoryScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    LinearScale
);

const Analysis = () => {
    const [date, setDate] = useState(new Date());
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dateCount, setDateCount] = useState(1);
    const navigate = useNavigate();
    const [eatCategory, setEatCategory] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
    });

    // 한주간 데이터 fetch중인지 월간 데이터 fetch중인지 판단을 위한 상태값
    // 탭 컴포넌트의 urlmatch 로직과 동일
    const [isWeek, setIsWeek] = useState(true);

    const [nutrition, setNutrition] = useState({
        energy: 0,
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
        water_amount: 0,
    });
    const categoryCheck = (categoryArray) => {
        let copy = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
        };

        for (let i of categoryArray) {
            copy[i] = true;
        }

        setEatCategory({ ...copy });
    };

    const onChange = (d) => {
        setLoading(true);
        axios
            .get(
                `https://cryptic-castle-40575.herokuapp.com/api/v1/consumption/day/?date=${d.getTime()}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            )
            .then((response) => {
                let res = response.data;

                for (let i in res) {
                    if (i === 'category' || i === 'day_count') {
                        continue;
                    }
                    res[i] = Number.isInteger(+res[i])
                        ? res[i]
                        : res[i].toFixed(1);
                }
                categoryCheck(response.data.category);

                setNutrition(res);
                setLoading(false);
                setIsDateSelected(true);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 403) {
                    alert('세션이 만료되었습니다. 다시 로그인 해주세요!');
                    navigate('/login');
                    return;
                }
                let initializedNutrition = {
                    energy: 0,
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
                    water_amount: 0,
                };

                setNutrition(initializedNutrition);

                setEatCategory({
                    1: false,
                    2: false,
                    3: false,
                    4: false,
                    5: false,
                    6: false,
                    7: false,
                    8: false,
                    9: false,
                });
                setLoading(false);
                alert('이 날에는 기록하지 않으셨네요!');
            });
        setDate(d);
        setDateCount(1);
    };

    const fetchWeekData = () => {
        setLoading(true);
        setIsWeek(true);
        axios(
            `https://cryptic-castle-40575.herokuapp.com/api/v1/consumption/week/?date=${date.getTime()}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        'access_token'
                    )}`,
                },
            }
        )
            .then((response) => {
                let res = response.data;
                console.log(res);

                for (let i in res) {
                    if (i === 'category' || i === 'day_count') {
                        continue;
                    }
                    res[i] = Number.isInteger(+res[i])
                        ? res[i]
                        : res[i].toFixed(1);
                }
                categoryCheck(response.data.category);

                setNutrition(res);
                setLoading(false);

                setDateCount(response.data.day_count);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 403) {
                    alert('세션이 만료되었습니다. 다시 로그인 해주세요!');
                    navigate('/login');
                    return;
                }
                let initializedNutrition = {
                    energy: 0,
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
                    water_amount: 0,
                };

                setNutrition(initializedNutrition);
                setLoading(false);
                setEatCategory({
                    1: false,
                    2: false,
                    3: false,
                    4: false,
                    5: false,
                    6: false,
                    7: false,
                    8: false,
                    9: false,
                });
                setDateCount(1);
                alert('한 주간 입력된 데이터가 없어요 😭');
            });
    };

    const fetchMonthData = () => {
        setLoading(true);
        setIsWeek(false);
        axios(
            `https://cryptic-castle-40575.herokuapp.com/api/v1/consumption/month/?date=${date.getTime()}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                        'access_token'
                    )}`,
                },
            }
        )
            .then((response) => {
                let res = response.data;
                for (let i in res) {
                    // day_count, category key 제외
                    if (i === 'day_count' || i === 'category') continue;
                    res[i] = Number.isInteger(+res[i])
                        ? res[i]
                        : res[i].toFixed(1);
                }
                categoryCheck(response.data.category);

                setDateCount(response.data.day_count);
                setNutrition(res);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 403) {
                    alert('세션이 만료되었습니다. 다시 로그인 해주세요!');
                    navigate('/login');
                    return;
                }

                let initializedNutrition = {
                    energy: 0,
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
                    water_amount: 0,
                };

                setNutrition(initializedNutrition);
                setLoading(false);
                setEatCategory({
                    1: false,
                    2: false,
                    3: false,
                    4: false,
                    5: false,
                    6: false,
                    7: false,
                    8: false,
                    9: false,
                });
                setDateCount(1);
                alert('한 달간 입력된 데이터가 없어요 😭');
            });
    };

    return (
        <Container>
            <Contents>
                <DiaryTitle>
                    <Name>식이분석</Name>
                </DiaryTitle>
                <Calendar locale='en-US' onChange={onChange} value={date} />

                {loading && !isDateSelected ? (
                    <CircularProgress sx={{ marginTop: 10 }} />
                ) : isDateSelected ? (
                    <S.ButtonBox>
                        <S.FetchButton
                            onClick={() => {
                                fetchWeekData();
                            }}
                            isClicked={isWeek ? true : false}
                        >
                            <span>한 주간 섭취 영양소</span>
                            <span>확인하기</span>
                        </S.FetchButton>
                        <S.FetchButton
                            onClick={() => {
                                fetchMonthData();
                            }}
                            isClicked={isWeek ? false : true}
                        >
                            <span>한 달간 섭취 영양소</span>
                            <span>확인하기</span>
                        </S.FetchButton>
                    </S.ButtonBox>
                ) : null}
                {isDateSelected ? (
                    <>
                        <>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <>
                                    <S.SectionTitle>
                                        Nutrients for Neurobehavioral
                                        Development
                                    </S.SectionTitle>
                                    <S.NutrientBox>
                                        <S.NutrientList>
                                            <Name
                                                style={{
                                                    fontWeight: 400,
                                                }}
                                            >
                                                DHA+EPA{' '}
                                                {(
                                                    (nutrition.dha_epa /
                                                        (300 * dateCount)) *
                                                    100
                                                ).toFixed(1)}
                                                %
                                            </Name>
                                            <Name style={{ fontWeight: 400 }}>
                                                엽산{' '}
                                                {(
                                                    (nutrition.folic_acid /
                                                        (180 * dateCount)) *
                                                    100
                                                ).toFixed(1)}
                                                %
                                            </Name>

                                            <Name
                                                style={{
                                                    fontWeight: 400,
                                                }}
                                            >
                                                마그네슘{' '}
                                                {(
                                                    (nutrition.magnesium /
                                                        (110 * dateCount)) *
                                                    100
                                                ).toFixed(1)}
                                                %
                                            </Name>
                                            <S.Divider />

                                            <Name style={{ fontWeight: 400 }}>
                                                트립토판{' '}
                                                {(
                                                    (nutrition.tryptophan /
                                                        (0.1 * dateCount)) *
                                                    100
                                                ).toFixed(1)}
                                                %
                                            </Name>
                                            <Name style={{ fontWeight: 400 }}>
                                                비타민 A{' '}
                                                {(
                                                    (nutrition.vitamin_a /
                                                        (300 * dateCount)) *
                                                    100
                                                ).toFixed(1)}
                                                %
                                            </Name>
                                            <Name style={{ fontWeight: 400 }}>
                                                식이섬유{' '}
                                                {(
                                                    (nutrition.dietary_fiber /
                                                        (20 * dateCount)) *
                                                    100
                                                ).toFixed(1)}
                                                %
                                            </Name>
                                            <S.Divider />
                                            <Name style={{ fontWeight: 400 }}>
                                                비타민 B6{' '}
                                                {(
                                                    (nutrition.vitamin_b6 /
                                                        (0.7 * dateCount)) *
                                                    100
                                                ).toFixed(1)}
                                                %
                                            </Name>

                                            <Name style={{ fontWeight: 400 }}>
                                                비타민 B12{' '}
                                                {(
                                                    (nutrition.vitamin_b12 /
                                                        (1.1 * dateCount)) *
                                                    100
                                                ).toFixed(1)}
                                                %
                                            </Name>
                                            <Name style={{ fontWeight: 400 }}>
                                                비타민 D{' '}
                                                {(
                                                    (nutrition.vitamin_d /
                                                        (5 * dateCount)) *
                                                    100
                                                ).toFixed(1)}
                                                %
                                            </Name>
                                        </S.NutrientList>

                                        <div
                                            style={{
                                                width: '70%',
                                                boxSizing: 'border-box',
                                            }}
                                        >
                                            <RadarGraph data={nutrition} />
                                        </div>
                                    </S.NutrientBox>
                                    <BarGraph
                                        count={dateCount}
                                        data={nutrition}
                                    />
                                    <S.SectionTitle>
                                        Diversity for Nutrients & Microbiome
                                    </S.SectionTitle>
                                    <S.Box>
                                        <S.IconBox>
                                            <S.IconWrapper
                                                isEat={eatCategory[1]}
                                            >
                                                <S.Icon
                                                    src={a}
                                                    // src={carbohydrates}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    fontSize: '0.5rem',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {/* 탄수화물 */}채소
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox>
                                            <S.IconWrapper
                                                isEat={eatCategory[2]}
                                            >
                                                <S.Icon
                                                    src={b}
                                                    // src={dha}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    fontSize: '0.5rem',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {/* DHA+EPA */}과일
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox>
                                            <S.IconWrapper
                                                isEat={eatCategory[3]}
                                            >
                                                <S.Icon
                                                    src={c}
                                                    // src={fat}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    fontSize: '0.5rem',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {/* 지방 */}콩/두부
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox>
                                            <S.IconWrapper
                                                isEat={eatCategory[4]}
                                            >
                                                <S.Icon
                                                    src={d}
                                                    // src={folic}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    marginBottom: 5,
                                                    fontSize: '0.5rem',
                                                }}
                                            >
                                                {/* 엽산 */}통곡물
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox>
                                            <S.IconWrapper
                                                isEat={eatCategory[5]}
                                            >
                                                <S.Icon
                                                    src={e}
                                                    // src={magnesium}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    marginBottom: 5,
                                                    fontSize: '0.5rem',
                                                }}
                                            >
                                                {/* 마그네슘 */}버섯
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox>
                                            <S.IconWrapper
                                                isEat={eatCategory[6]}
                                            >
                                                <S.Icon
                                                    src={f}
                                                    // src={protein}
                                                />
                                            </S.IconWrapper>

                                            <Name
                                                style={{
                                                    marginBottom: 5,
                                                    fontSize: '0.5rem',
                                                }}
                                            >
                                                {/* 단백질 */}해조류
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox>
                                            <S.IconWrapper
                                                isEat={eatCategory[7]}
                                            >
                                                <S.Icon
                                                    src={g}
                                                    // src={tryptophan}
                                                />
                                            </S.IconWrapper>

                                            <Name
                                                style={{
                                                    marginBottom: 5,
                                                    fontSize: '0.5rem',
                                                }}
                                            >
                                                {/* 트립토판 */}견과
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox>
                                            <S.IconWrapper
                                                isEat={eatCategory[8]}
                                            >
                                                <S.Icon
                                                    src={h}
                                                    // src={vitaminA}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    marginBottom: 5,
                                                    fontSize: '0.5rem',
                                                }}
                                            >
                                                {/* 비타민 A */}고기/생선/달걀
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox>
                                            <S.IconWrapper
                                                isEat={eatCategory[9]}
                                            >
                                                <S.Icon
                                                    src={i}
                                                    // src={vitaminB6}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    marginBottom: 5,
                                                    fontSize: '0.5rem',
                                                }}
                                            >
                                                {/* 비타민 B6 */}유제품
                                            </Name>
                                        </S.IconBox>
                                    </S.Box>
                                </>
                            )}
                        </>
                    </>
                ) : null}
            </Contents>
        </Container>
    );
};

export default Analysis;
