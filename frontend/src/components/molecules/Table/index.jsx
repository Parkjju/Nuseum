import { useState } from 'react';
import { useEffect } from 'react';
import useCalculate from '../../../hooks/useCalculate';
import BottomSheet from '../BottomSheet/BottomSheet';
import { CurationMeal, CurationMealWrapper, CurationTd } from './Table.styled';

const Table = ({
    curationData,
    inSufficientDiversity,
    inSufficientNutrition,
    style,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [clickedTag, setClickedTag] = useState('');

    // curationData와 데이터 내부는 동일하지만 0: {}, 1: {} 형태로 변경해주기 위한 상태값임.
    const [curationList, setCurationList] = useState({
        0: {
            '0.0': null,
            0.1: null,
            0.2: null,
            0.3: null,
            0.4: null,
            0.5: null,
            0.6: null,
            0.7: null,
            0.8: null,
        },
        1: {
            '1.0': null,
            1.1: null,
            1.2: null,
            1.3: null,
            1.4: null,
            1.5: null,
            1.6: null,
            1.7: null,
            1.8: null,
        },
        2: {
            '2.0': null,
            2.1: null,
            2.2: null,
            2.3: null,
            2.4: null,
            2.5: null,
            2.6: null,
            2.7: null,
            2.8: null,
        },
        3: {
            '3.0': null,
            3.1: null,
            3.2: null,
            3.3: null,
            3.4: null,
            3.5: null,
            3.6: null,
            3.7: null,
            3.8: null,
        },
        4: {
            '4.0': null,
            4.1: null,
            4.2: null,
            4.3: null,
            4.4: null,
            4.5: null,
            4.6: null,
            4.7: null,
            4.8: null,
        },
        5: {
            '5.0': null,
            5.1: null,
            5.2: null,
            5.3: null,
            5.4: null,
            5.5: null,
            5.6: null,
            5.7: null,
            5.8: null,
        },
        6: {
            '6.0': null,
            6.1: null,
            6.2: null,
            6.3: null,
            6.4: null,
            6.5: null,
            6.6: null,
            6.7: null,
            6.8: null,
        },
        7: {
            '7.0': null,
            7.1: null,
            7.2: null,
            7.3: null,
            7.4: null,
            7.5: null,
            7.6: null,
            7.7: null,
            7.8: null,
        },
        8: {
            '8.0': null,
            8.1: null,
            8.2: null,
            8.3: null,
            8.4: null,
            8.5: null,
            8.6: null,
            8.7: null,
            8.8: null,
        },
    });

    // 영양성분 및 골고루지수가 충분하여 추천에서 빠진 리스트
    const [notCuratedList, setNotCuratedList] = useState({
        0: {
            '0.0': null,
            0.1: null,
            0.2: null,
            0.3: null,
            0.4: null,
            0.5: null,
            0.6: null,
            0.7: null,
            0.8: null,
        },
        1: {
            '1.0': null,
            1.1: null,
            1.2: null,
            1.3: null,
            1.4: null,
            1.5: null,
            1.6: null,
            1.7: null,
            1.8: null,
        },
        2: {
            '2.0': null,
            2.1: null,
            2.2: null,
            2.3: null,
            2.4: null,
            2.5: null,
            2.6: null,
            2.7: null,
            2.8: null,
        },
        3: {
            '3.0': null,
            3.1: null,
            3.2: null,
            3.3: null,
            3.4: null,
            3.5: null,
            3.6: null,
            3.7: null,
            3.8: null,
        },
        4: {
            '4.0': null,
            4.1: null,
            4.2: null,
            4.3: null,
            4.4: null,
            4.5: null,
            4.6: null,
            4.7: null,
            4.8: null,
        },
        5: {
            '5.0': null,
            5.1: null,
            5.2: null,
            5.3: null,
            5.4: null,
            5.5: null,
            5.6: null,
            5.7: null,
            5.8: null,
        },
        6: {
            '6.0': null,
            6.1: null,
            6.2: null,
            6.3: null,
            6.4: null,
            6.5: null,
            6.6: null,
            6.7: null,
            6.8: null,
        },
        7: {
            '7.0': null,
            7.1: null,
            7.2: null,
            7.3: null,
            7.4: null,
            7.5: null,
            7.6: null,
            7.7: null,
            7.8: null,
        },
        8: {
            '8.0': null,
            8.1: null,
            8.2: null,
            8.3: null,
            8.4: null,
            8.5: null,
            8.6: null,
            8.7: null,
            8.8: null,
        },
    });

    // 좌표관리 상태값
    const [coordinates, setCoordinates] = useState([]);

    // === 중복제거 리스트 및 가중치 초기화 ===
    const [weight, setWeight] = useState({});

    // =====

    // 좌표정렬
    // 만들어진 좌표 기준으로 curationData 키값 조회

    useEffect(() => {
        for (let nutrition of inSufficientNutrition) {
            for (let diversity of inSufficientDiversity) {
                setCoordinates((prev) => [
                    ...prev,
                    `${diversity}.${nutrition}`,
                ]);
            }
        }
    }, [inSufficientDiversity, inSufficientNutrition]);

    // 좌표정렬 후 큐레이션 대상 딕셔너리 정의
    useEffect(() => {
        // (insufficientCategory, insufficientNutrition) 좌표 전체 리스트를 순회하면서
        // 해당 좌표에 해당하는 데이터들은 추천 대상이므로 큐레이션 리스트에 집어넣어야 함
        // 그 외의 것들은 집어넣지 않음
        // curationData는 추천을 위한 전체 음식리스트임
        // curationList는 insufficient한 피처들을 좌표화 하여 만들어낸 최종 추천리스트
        setCurationList((prev) => {
            for (let coordinate of coordinates) {
                // 가중치 부여
                if (curationData[coordinate]) {
                    for (let meal of Object.keys(curationData[coordinate])) {
                        setWeight((prev) => {
                            return {
                                ...prev,
                                [meal]: (prev[meal] += 1),
                            };
                        });
                    }
                }

                prev[coordinate.split('.')[0]][coordinate] =
                    curationData[coordinate];
            }
            return { ...prev };
        });

        setWeight((prev) => {
            let copy = { ...prev };
            for (let obj of Object.values(curationData)) {
                for (let meal of Object.keys(obj)) {
                    if (!copy[meal]) {
                        copy[meal] = 0;
                    }
                }
            }

            return {
                ...copy,
            };
        });
    }, [curationData, coordinates]);

    // 추천리스트 정렬 후 추천대상에서 제외된 리스트 추가 - 섀도우 부여를 위함
    useEffect(() => {
        for (let dictKey of Object.keys(curationList)) {
            for (let key of Object.keys(curationList[dictKey])) {
                // 큐레이션되지 않았으면서 기존 추천대상에는 있는 경우
                // -> 해당 데이터들을 쉐도우 처리한다.
                if (!curationList[dictKey][key] && curationData[key]) {
                    setNotCuratedList((prev) => {
                        let copy = { ...prev };

                        return {
                            ...copy,
                            [dictKey]: {
                                ...prev[dictKey],
                                [key]: curationData[key],
                            },
                        };
                    });
                }
            }
        }
    }, [curationList, coordinates]);

    // 테이블 th 성분값 얻어내는 함수
    const getTitleHeader = (key) => {
        switch (key) {
            case '0':
                return '채소';
            case '1':
                return '과일';
            case '2':
                return '콩/두부';
            case '3':
                return '통곡물';
            case '4':
                return '버섯';
            case '5':
                return '해조류';
            case '6':
                return '견과';
            case '7':
                return '고기/생선/달걀';
            case '8':
                return '유제품';
        }
    };

    return (
        <div
            style={{ ...style }}
            role='region'
            aria-label='data table'
            tabindex='0'
            class='primary'
        >
            <table>
                <thead>
                    <tr>
                        <th class='pin'></th>
                        <th>DHA+EPA</th>
                        <th>비타민 A</th>
                        <th>마그네슘</th>
                        <th>트립토판</th>
                        <th>비타민 B6</th>
                        <th>비타민 B12</th>
                        <th>엽산</th>
                        <th>비타민 D</th>
                        <th>식이섬유</th>
                    </tr>
                </thead>

                <tbody>
                    {Object.keys(curationList).map(
                        (diversityCoordinate, index) => (
                            <tr>
                                <th key={index}>
                                    {getTitleHeader(diversityCoordinate)}
                                </th>
                                {Object.entries(
                                    curationList[diversityCoordinate]
                                ).map((cellData, index) => (
                                    <CurationTd key={index}>
                                        {cellData[1]
                                            ? Object.keys(cellData[1]).map(
                                                  (meal) => (
                                                      <CurationMeal
                                                          numberOfCurated={
                                                              weight[meal]
                                                          }
                                                          onClick={(e) => {
                                                              setIsOpen(true);
                                                              setClickedTag(
                                                                  e.target
                                                                      .innerText
                                                              );
                                                          }}
                                                      >
                                                          {meal}
                                                      </CurationMeal>
                                                  )
                                              )
                                            : notCuratedList[
                                                  diversityCoordinate
                                              ][cellData[0]]
                                            ? Object.keys(
                                                  notCuratedList[
                                                      diversityCoordinate
                                                  ][cellData[0]]
                                              ).map((meal) => (
                                                  <CurationMeal
                                                      notCurated={true}
                                                      onClick={(e) => {
                                                          setIsOpen(true);
                                                          setClickedTag(
                                                              e.target.innerText
                                                          );
                                                      }}
                                                  >
                                                      {meal}
                                                  </CurationMeal>
                                              ))
                                            : null}
                                    </CurationTd>
                                ))}
                            </tr>
                        )
                    )}
                </tbody>
            </table>

            {isOpen ? (
                <BottomSheet setIsOpen={setIsOpen} clickedTag={clickedTag} />
            ) : null}
        </div>
    );
};

export default Table;
