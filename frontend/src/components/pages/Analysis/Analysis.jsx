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
import a from '../../../assets/a.png';
import b from '../../../assets/b.png';
import c from '../../../assets/c.png';
import d from '../../../assets/d.png';
import e from '../../../assets/e.png';
import f from '../../../assets/f.png';
import g from '../../../assets/g.png';
import h from '../../../assets/h.png';
import i from '../../../assets/i.png';
import j from '../../../assets/j.png';
import k from '../../../assets/k.png';
import l from '../../../assets/l.png';

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
    const [isClicked, setIsClicked] = useState(true);

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
                    res[i] = Number.isInteger(+res[i])
                        ? res[i]
                        : res[i].toFixed(3);
                }

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

                setLoading(false);
                alert('이 날에는 기록하지 않으셨네요!');
            });
        setDate(d);
        setDateCount(1);
    };

    const fetchWeekData = () => {
        setLoading(true);
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
                console.log(response.data);
                let res = response.data;
                for (let i in res) {
                    res[i] = Number.isInteger(+res[i])
                        ? res[i]
                        : res[i].toFixed(3);
                }

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
                setDateCount(1);
                alert('한 주간 입력된 데이터가 없어요 😭');
            });
    };

    const fetchMonthData = () => {
        setLoading(true);
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
                        : res[i].toFixed(3);
                }

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
                ) : (
                    <S.ButtonBox>
                        <S.FetchButton
                            isClicked={isClicked}
                            onClick={() => {
                                fetchWeekData();
                                setIsClicked(true);
                            }}
                        >
                            <span>한 주간 섭취 영양소</span>
                            <span>확인하기</span>
                        </S.FetchButton>
                        <S.FetchButton
                            isClicked={!isClicked}
                            onClick={() => {
                                fetchMonthData();
                                setIsClicked(true);
                            }}
                        >
                            <span>한 달간 섭취 영양소</span>
                            <span>확인하기</span>
                        </S.FetchButton>
                    </S.ButtonBox>
                )}
                {isDateSelected ? (
                    <>
                        {loading ? (
                            <CircularProgress sx={{ marginTop: 5 }} />
                        ) : nutrition ? (
                            <>
                                <RadarGraph data={nutrition} />
                                <BarGraph count={dateCount} data={nutrition} />

                                <S.Box>
                                    <S.IconBox>
                                        <S.Icon
                                            src={a}
                                            // src={carbohydrates}
                                        />
                                        <Name
                                            style={{
                                                fontSize: '0.5rem',
                                                marginBottom: 5,
                                            }}
                                        >
                                            {/* 탄수화물 */}A
                                        </Name>
                                        <Name style={{ fontSize: '0.5rem' }}>
                                            {(
                                                (nutrition.carbohydrate /
                                                    (130 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                    <S.IconBox>
                                        <S.Icon
                                            src={b}
                                            // src={dha}
                                        />
                                        <Name
                                            style={{
                                                fontSize: '0.5rem',
                                                marginBottom: 5,
                                            }}
                                        >
                                            {/* DHA+EPA */}B
                                        </Name>
                                        <Name style={{ fontSize: '0.5rem' }}>
                                            {(
                                                (nutrition.dha_epa /
                                                    (300 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                    <S.IconBox>
                                        <S.Icon
                                            src={c}
                                            // src={fat}
                                        />
                                        <Name
                                            style={{
                                                fontSize: '0.5rem',
                                                marginBottom: 5,
                                            }}
                                        >
                                            {/* 지방 */}C
                                        </Name>
                                        <Name style={{ fontSize: '0.5rem' }}>
                                            {(
                                                (nutrition.fat /
                                                    (102 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                    <S.IconBox>
                                        <S.Icon
                                            src={d}
                                            // src={folic}
                                        />
                                        <Name
                                            style={{
                                                marginBottom: 5,
                                                fontSize: '0.5rem',
                                            }}
                                        >
                                            {/* 엽산 */}D
                                        </Name>
                                        <Name
                                            style={{
                                                fontSize: '0.5rem',
                                            }}
                                        >
                                            {(
                                                (nutrition.folic_acid /
                                                    (180 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                    <S.IconBox>
                                        <S.Icon
                                            src={e}
                                            // src={magnesium}
                                        />
                                        <Name
                                            style={{
                                                marginBottom: 5,
                                                fontSize: '0.5rem',
                                            }}
                                        >
                                            {/* 마그네슘 */}E
                                        </Name>
                                        <Name style={{ fontSize: '0.5rem' }}>
                                            {(
                                                (nutrition.magnesium /
                                                    (110 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                    <S.IconBox>
                                        <S.Icon
                                            src={f}
                                            // src={protein}
                                        />
                                        <Name
                                            style={{
                                                marginBottom: 5,
                                                fontSize: '0.5rem',
                                            }}
                                        >
                                            {/* 단백질 */}F
                                        </Name>
                                        <Name style={{ fontSize: '0.5rem' }}>
                                            {(
                                                (nutrition.protein /
                                                    (25 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                    <S.IconBox>
                                        <S.Icon
                                            src={g}
                                            // src={tryptophan}
                                        />

                                        <Name
                                            style={{
                                                marginBottom: 5,
                                                fontSize: '0.5rem',
                                            }}
                                        >
                                            {/* 트립토판 */}G
                                        </Name>
                                        <Name style={{ fontSize: '0.5rem' }}>
                                            {(
                                                (nutrition.tryptophan /
                                                    (0.1 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                    <S.IconBox>
                                        <S.Icon
                                            src={h}
                                            // src={vitaminA}
                                        />
                                        <Name
                                            style={{
                                                marginBottom: 5,
                                                fontSize: '0.5rem',
                                            }}
                                        >
                                            {/* 비타민 A */}H
                                        </Name>
                                        <Name
                                            style={{
                                                fontSize: '0.5rem',
                                            }}
                                        >
                                            {(
                                                (nutrition.vitamin_a /
                                                    (300 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                    <S.IconBox>
                                        <S.Icon
                                            src={i}
                                            // src={vitaminB6}
                                        />
                                        <Name
                                            style={{
                                                marginBottom: 5,
                                                fontSize: '0.5rem',
                                            }}
                                        >
                                            {/* 비타민 B6 */}I
                                        </Name>
                                        <Name style={{ fontSize: '0.5rem' }}>
                                            {(
                                                (nutrition.vitamin_b6 /
                                                    (0.7 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                    <S.IconBox>
                                        <S.Icon
                                            src={j}
                                            // src={fiber}
                                        />
                                        <Name
                                            style={{
                                                marginBottom: 5,
                                                fontSize: '0.5rem',
                                            }}
                                        >
                                            {/* 식이섬유 */}J
                                        </Name>
                                        <Name style={{ fontSize: '0.5rem' }}>
                                            {(
                                                (nutrition.dietary_fiber /
                                                    (20 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                    <S.IconBox>
                                        <S.Icon
                                            src={k}
                                            // src={vitaminB12}
                                        />
                                        <Name
                                            style={{
                                                marginBottom: 5,
                                                fontSize: '0.5rem',
                                            }}
                                        >
                                            {/* 비타민 B12 */}K
                                        </Name>
                                        <Name style={{ fontSize: '0.5rem' }}>
                                            {(
                                                (nutrition.vitamin_b12 /
                                                    (1.1 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                    <S.IconBox>
                                        <S.Icon
                                            src={l}
                                            // src={vitaminD}
                                        />
                                        <Name
                                            style={{
                                                marginBottom: 5,
                                                fontSize: '0.5rem',
                                            }}
                                        >
                                            {/* 비타민 D */}L
                                        </Name>
                                        <Name style={{ fontSize: '0.5rem' }}>
                                            {(
                                                (nutrition.vitamin_d /
                                                    (5 * dateCount)) *
                                                100
                                            ).toFixed(3)}
                                            %
                                        </Name>
                                    </S.IconBox>
                                </S.Box>
                            </>
                        ) : null}
                    </>
                ) : null}
            </Contents>
        </Container>
    );
};

export default Analysis;
