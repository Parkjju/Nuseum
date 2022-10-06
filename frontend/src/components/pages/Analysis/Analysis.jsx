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
import kid from '../../../assets/kid.png';

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
import { useDispatch, useSelector } from 'react-redux';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import { useEffect } from 'react';

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
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dateCount, setDateCount] = useState(1);
    const navigate = useNavigate();
    const [nutrientPoint, setNutrientPoint] = useState(0);
    const [microbiomePoint, setMicrobiomePoint] = useState(0);
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

    useEffect(() => {
        let pointNutrient = 0;
        let pointMicro = 0;

        for (let i in eatCategory) {
            if (eatCategory[i]) {
                pointNutrient += 1;

                if (i === 8 || i === 9) {
                    continue;
                }
                pointMicro += 1;
            }
        }

        setNutrientPoint(pointNutrient);
        setMicrobiomePoint(pointMicro);
    }, [eatCategory]);

    // 한주간 데이터 fetch중인지 월간 데이터 fetch중인지 판단을 위한 상태값
    // 탭 컴포넌트의 urlmatch 로직과 동일
    const [isSelected, setIsSelected] = useState([true, false, false]);

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

    const onChange = async (d) => {
        setLoading(true);
        axios
            .get(`/api/v1/consumption/day/?date=${d.getTime()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                let res = response.data;

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
                for (let i in res) {
                    if (i === 'category' || i === 'day_count') {
                        continue;
                    }
                    res[i] = Number.isInteger(+res[i])
                        ? res[i]
                        : res[i].toFixed(1);
                }
                categoryCheck(response.data.category);

                // {'채소': 1, '과일': 2, '콩/두부': 3, '통곡물': 4, '버섯': 5, '해조류': 6, '견과': 7, '고기/생선/달걀': 8, '유제품': 9}

                setNutrition(res);
                setLoading(false);
                setIsDateSelected(true);
            })
            .catch(async (err) => {
                console.log(err);
                if (err.response.status === 401) {
                    const { exp, token } = await handleExpired();
                    dispatch(
                        authActions.login({
                            token: token.data.access,
                            exp,
                        })
                    );
                    setLoading(false);
                } else {
                    console.log(err);
                    alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
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

    const fetchDailyData = () => {
        setLoading(true);
        setIsSelected([true, false, false]);
        axios
            .get(`/api/v1/consumption/day/?date=${date.getTime()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                let res = response.data;

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
            .catch(async (err) => {
                console.log(err);
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
                nu;

                setLoading(false);
            });
    };

    const fetchWeekData = () => {
        setLoading(true);
        setIsSelected([false, true, false]);
        axios(`/api/v1/consumption/week/?date=${date.getTime()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                let res = response.data;

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
            .catch(async (err) => {
                console.log(err);
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
                setLoading(false);
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
                nu;

                alert('한 주간 입력된 데이터가 없어요 😭');
            });
    };

    const fetchMonthData = () => {
        setLoading(true);
        setIsSelected([false, false, true]);
        axios(`/api/v1/consumption/month/?date=${date.getTime()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                let res = response.data;

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
            .catch(async (err) => {
                console.log(err);
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
                setLoading(false);

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
                nu;

                alert('한 달간 입력된 데이터가 없어요 😭');
            });
    };

    return (
        <Container>
            <Contents>
                <DiaryTitle style={{
                        height: 'auto',
                    }}>
                    <Name style={{fontSize:'16px'}}>식이분석</Name>
                </DiaryTitle>
                <Calendar locale='en-US' onChange={onChange} value={date} />

                {isDateSelected ? null : (
                    <Name
                        style={{
                            width: '90%',
                            marginTop: 40,
                            whiteSpace: 'normal',
                            lineHeight: 2,
                            textAlign: 'center',
                            color: '#7E8C8D',
                            fontWeight: 500,
                            fontSize: '13px'
                        }}
                    >
                        식이분석내용을 확인하고 싶은 날짜를 클릭해주세요 :)
                    </Name>
                )}

                {loading && !isDateSelected ? (
                    <CircularProgress sx={{ marginTop: 10 }} />
                ) : isDateSelected ? (
                    <S.ButtonBox>
                        <S.FetchButton
                            onClick={() => {
                                fetchDailyData();
                            }}
                            isClicked={isSelected[0]}
                        >
                            <span>이 날의 섭취 영양소</span>
                            <span>확인하기</span>
                        </S.FetchButton>
                        <S.FetchButton
                            onClick={() => {
                                fetchWeekData();
                            }}
                            isClicked={isSelected[1]}
                        >
                            <span>한 주간 섭취 영양소</span>
                            <span>확인하기</span>
                        </S.FetchButton>
                        <S.FetchButton
                            onClick={() => {
                                fetchMonthData();
                            }}
                            isClicked={isSelected[2]}
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
                                        <p style={{ lineHeight: 1.5 , fontWeight: 500}}>
                                        아래의 영양성분들은 신경행동발달에 영향을 미치는 영양성분들에 
                                        대해 총 1,787개의 논문들을 리뷰하여 선별되었으며 
                                        이들에 대한 섭취내용을 분석합니다.
                                        </p>
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
                                                        (100 * dateCount)) *
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
                                    <div
                                        style={{
                                            width: '90%',
                                            marginBottom: '30px',
                                        }}
                                    >
                                        <BarGraph
                                            count={dateCount}
                                            data={nutrition}
                                        />
                                    </div>
                                    <S.SectionTitle>                                        
                                        <p style={{ lineHeight: 1.5, fontWeight: 500 }}>
                                        다양한 식품군의 섭취는 다양한 영양성분과 생리활성물질을 섭취하게 하고, 
                                        이는 장내 다양한 미생물을 서식하게 하여, 건강한 뇌발달에 영향을 미칩니다. 섭취한 식품군과 섭취가 필요해 보이는 식품군을 분석합니다.
                                        </p>
                                    </S.SectionTitle>
                                    <S.Box>
                                        <S.IconBox isPoint={true} style={{boxShadow : 'inset 0px 3px 7px rgba(0, 0, 0, 0.1)'}}>
                                            <Name
                                                style={{
                                                    fontSize: '12px',
                                                    marginTop: 5,
                                                    marginBottom: 5,
                                                    color: 'white',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                골고루 지수
                                            </Name>
                                            <S.IconWrapper>
                                                <S.Point>
                                                    {(
                                                        (nutrientPoint / 9) *
                                                        100
                                                    ).toFixed(0)} <span style={{fontSize:'17px'}}>점</span>
                                                </S.Point>
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    fontSize: '11px',
                                                    marginBottom: 5,
                                                    color: 'white',
                                                }}
                                            >
                                                {nutrientPoint}
                                                /9
                                            </Name>                                            
                                        </S.IconBox>                                        
                                        {/* 아래부터 실제 데이터 */}
                                        <S.IconBox isEat={eatCategory[1]}>
                                            <S.IconWrapper>
                                                <S.Icon
                                                    src={a}
                                                    // src={carbohydrates}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    fontSize: '12px',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {/* 탄수화물 */}채소
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox isEat={eatCategory[2]}>
                                            <S.IconWrapper>
                                                <S.Icon
                                                    src={b}
                                                    // src={dha}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    fontSize: '12px',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {/* DHA+EPA */}과일
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox isEat={eatCategory[3]}>
                                            <S.IconWrapper>
                                                <S.Icon
                                                    src={c}
                                                    // src={fat}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    fontSize: '12px',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {/* 지방 */}콩/두부
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox isEat={eatCategory[4]}>
                                            <S.IconWrapper>
                                                <S.Icon
                                                    src={d}
                                                    // src={folic}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    fontSize: '12px',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {/* 엽산 */}통곡물
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox isEat={eatCategory[5]}>
                                            <S.IconWrapper>
                                                <S.Icon
                                                    src={e}
                                                    // src={magnesium}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    fontSize: '12px',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {/* 마그네슘 */}버섯
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox isEat={eatCategory[6]}>
                                            <S.IconWrapper>
                                                <S.Icon
                                                    src={f}
                                                    // src={protein}
                                                />
                                            </S.IconWrapper>

                                            <Name
                                                style={{
                                                    fontSize: '12px',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {/* 단백질 */}해조류
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox isEat={eatCategory[7]}>
                                            <S.IconWrapper>
                                                <S.Icon
                                                    src={g}
                                                    // src={tryptophan}
                                                />
                                            </S.IconWrapper>

                                            <Name
                                                style={{
                                                    fontSize: '12px',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {/* 트립토판 */}견과
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox isEat={eatCategory[8]}>
                                            <S.IconWrapper>
                                                <S.Icon
                                                    src={h}
                                                    // src={vitaminA}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    fontSize: '12px',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {/* 비타민 A */}고기/생선/달걀
                                            </Name>
                                        </S.IconBox>
                                        <S.IconBox isEat={eatCategory[9]}>
                                            <S.IconWrapper>
                                                <S.Icon
                                                    src={i}
                                                    // src={vitaminB6}
                                                />
                                            </S.IconWrapper>
                                            <Name
                                                style={{
                                                    fontSize: '12px',
                                                    marginBottom: 5,
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
