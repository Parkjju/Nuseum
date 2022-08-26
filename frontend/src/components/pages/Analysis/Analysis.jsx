import { useEffect, useState } from 'react';
import { Name } from '../../atom/Card/styled';
import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { DiaryTitle } from '../Record/styled';
import * as S from './Analysis.style';
import carbohydrates from '../../../assets/carbohydrates.png';
import dha from '../../../assets/dha.png';
import fat from '../../../assets/fat.png';
import folic from '../../../assets/folic.png';
import magnesium from '../../../assets/magnesium.png';
import protein from '../../../assets/proteins.png';
import tryptophan from '../../../assets/tryptophan.png';
import vitaminA from '../../../assets/vitamin-a.png';
import vitaminB6 from '../../../assets/vitamin-b6.png';
import fiber from '../../../assets/vegetables.png';
import vitaminB12 from '../../../assets/vitamin-b12.png';
import vitaminD from '../../../assets/vitamin-d.png';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { textAlign } from '@mui/system';

const Analysis = () => {
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
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
                    res[i] = Number.isInteger(res[i])
                        ? res[i]
                        : res[i].toFixed(3);
                }

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
                alert('이 날에는 기록하지 않으셨네요!');
            });
        setDate(d);
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
                let res = response.data;
                for (let i in res) {
                    res[i] = Number.isInteger(res[i])
                        ? res[i]
                        : res[i].toFixed(3);
                }

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
                    res[i] = Number.isInteger(res[i])
                        ? res[i]
                        : res[i].toFixed(3);
                }

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

                {loading ? null : (
                    <S.ButtonBox>
                        <button onClick={fetchWeekData}>
                            한 주간 섭취 영양소 확인하기
                        </button>
                        <button onClick={fetchMonthData}>
                            한 달간 섭취 영양소 확인하기
                        </button>
                    </S.ButtonBox>
                )}
                <S.Box>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <S.IconBox>
                                <S.Icon src={carbohydrates} />
                                <Name style={{ marginBottom: 5 }}>
                                    탄수화물
                                </Name>
                                <Name>
                                    {nutrition.carbohydrate}g / 100-130g
                                </Name>
                            </S.IconBox>
                            <S.IconBox>
                                <S.Icon src={dha} />
                                <Name style={{ marginBottom: 5 }}>DHA+EPA</Name>
                                <Name>{nutrition.dha_epa}mg / 300mg</Name>
                            </S.IconBox>
                            <S.IconBox>
                                <S.Icon src={fat} />
                                <Name style={{ marginBottom: 5 }}>지방</Name>
                                <Name>{nutrition.fat}g / 86-102g</Name>
                            </S.IconBox>
                            <S.IconBox>
                                <S.Icon src={folic} />
                                <Name style={{ marginBottom: 5 }}>엽산</Name>
                                <Name
                                    style={{
                                        width: '200px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {nutrition.folic_acid}μg DFE  / 180μg DFE 
                                </Name>
                            </S.IconBox>
                            <S.IconBox>
                                <S.Icon src={magnesium} />
                                <Name style={{ marginBottom: 5 }}>
                                    마그네슘
                                </Name>
                                <Name>{nutrition.magnesium}mg / 110mg</Name>
                            </S.IconBox>
                            <S.IconBox>
                                <S.Icon src={protein} />
                                <Name style={{ marginBottom: 5 }}>단백질</Name>
                                <Name>{nutrition.protein}g / 20-25g</Name>
                            </S.IconBox>
                            <S.IconBox>
                                <S.Icon src={tryptophan} />
                                <Name style={{ marginBottom: 5 }}>
                                    트립토판
                                </Name>
                                <Name>{nutrition.tryptophan}g / 0.1g</Name>
                            </S.IconBox>
                            <S.IconBox>
                                <S.Icon src={vitaminA} />
                                <Name style={{ marginBottom: 5 }}>
                                    비타민 A
                                </Name>
                                <Name
                                    style={{
                                        width: '200px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {nutrition.vitamin_a}μg RAE / 300μg RAE
                                </Name>
                            </S.IconBox>
                            <S.IconBox>
                                <S.Icon src={vitaminB6} />
                                <Name style={{ marginBottom: 5 }}>
                                    비타민 B6
                                </Name>
                                <Name>{nutrition.vitamin_b6}mg / 0.7mg</Name>
                            </S.IconBox>
                            <S.IconBox>
                                <S.Icon src={fiber} />
                                <Name style={{ marginBottom: 5 }}>
                                    식이섬유
                                </Name>
                                <Name>{nutrition.dietary_fiber}g / 20g</Name>
                            </S.IconBox>
                            <S.IconBox>
                                <S.Icon src={vitaminB12} />
                                <Name style={{ marginBottom: 5 }}>
                                    비타민 B12
                                </Name>
                                <Name>{nutrition.vitamin_b12}μg / 1.1μg</Name>
                            </S.IconBox>
                            <S.IconBox>
                                <S.Icon src={vitaminD} />
                                <Name style={{ marginBottom: 5 }}>
                                    비타민 D
                                </Name>
                                <Name>{nutrition.vitamin_d}μg / 5μg</Name>
                            </S.IconBox>
                        </>
                    )}
                </S.Box>
            </Contents>
        </Container>
    );
};

export default Analysis;
