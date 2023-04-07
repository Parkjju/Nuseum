import Container from '../../atom/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchDailyNutrient } from '../../../api';
import Table from '../../molecules/Table';
import useCalculate from '../../../hooks/useCalculate';
import { ButtonBox, FetchButton } from '../Analysis/Analysis.style';

const Curation = () => {
    const range = useCalculate('M', 3);
    const [isSelected, setIsSelected] = useState([false, false]);
    let curationData = {};

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
