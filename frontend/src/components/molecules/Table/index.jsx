import { Container } from '@mui/system';
import { DiaryTitle } from '../../pages/Record/styled';
import { Name } from '../../atom/Card/styled';
import { useState } from 'react';
import { useEffect } from 'react';
import useCalculate from '../../../hooks/useCalculate';
import BottomSheet from '../BottomSheet/BottomSheet';
import { CurationMeal, CurationMealWrapper, CurationTd } from './Table.styled';

import { TooltipDescription } from '../../pages/Analysis/Analysis.style';
import { Tooltip } from '@mui/material';

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
                return '콩\n두부';
            case '3':
                return '통곡물';
            case '4':
                return '버섯';
            case '5':
                return '해조류';
            case '6':
                return '견과';
            case '7':
                return '고기\n생선\n달걀';
            case '8':
                return '유제품';
        }
    };

    return (
        <Container style={{ padding: '0 4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DiaryTitle
                style={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '30px',
                }}
            >
                <Name style={{ fontSize: '20px' }}>맞춤식품</Name>
            </DiaryTitle>

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
                            <Tooltip
                                title={
                                    <div>
                                        <TooltipDescription>
                                            1. 장내미생물의 먹이로 이용.
                                        </TooltipDescription>
                                        <TooltipDescription>
                                            2. 배변활동 원활에 도움을 줄 수
                                            있음.
                                        </TooltipDescription>
                                    </div>
                                }
                            >
                                <th>식이{'\n'}섬유</th>
                            </Tooltip>
                            <Tooltip
                                title={
                                    <div>
                                        <TooltipDescription>
                                            1. 뼈의 형성과 유지에 필요.
                                        </TooltipDescription>
                                        <TooltipDescription>
                                            2. 칼슘과 인이 흡수되고 이용되는데
                                            필요.
                                        </TooltipDescription>
                                        <TooltipDescription>
                                            3. 골다공증 발생 위험 감소에 도움을
                                            줌.
                                        </TooltipDescription>
                                    </div>
                                }
                            >
                                <th>비타민{'\n'}D</th>
                            </Tooltip>
                            <Tooltip
                                title={
                                    <div>
                                        <TooltipDescription>
                                            1. 기억력 개선에 도움을 줄 수 있음.
                                        </TooltipDescription>
                                        <TooltipDescription>
                                            2. 혈중 중성지질, 혈행개선에 도움을
                                            줄 수 있음.
                                        </TooltipDescription>
                                        <TooltipDescription>
                                            3. 건조한 눈을 개선하여 눈 건강에
                                            도움을 줄 수 있음.
                                        </TooltipDescription>
                                    </div>
                                }
                            >
                                <th>DHA+{'\n'}EPA</th>
                            </Tooltip>
                            <Tooltip
                                title={
                                    <div>
                                        <TooltipDescription>
                                            1. 신경과 근육 기능 유지에 필요.
                                        </TooltipDescription>
                                        <TooltipDescription>
                                            2. 에너지 이용에 필요.
                                        </TooltipDescription>
                                    </div>
                                }
                            >
                                <th>마그{'\n'}네슘</th>
                            </Tooltip>
                            <Tooltip
                                title={
                                    <div>
                                        <TooltipDescription>
                                            1.상피세포의 성장과 발달에 필요.
                                        </TooltipDescription>
                                        <TooltipDescription>
                                            2. 피부와 점막을 형성하고 기능을
                                            유지하는데 필요.
                                        </TooltipDescription>
                                        <TooltipDescription>
                                            3. 어두운 곳에서 시각 적응을 위해
                                            필요.
                                        </TooltipDescription>
                                    </div>
                                }
                            >
                                <th>비타민{'\n'}A</th>
                            </Tooltip>

                            <Tooltip
                                title={
                                    <div>
                                        <TooltipDescription>
                                            1.신경전달물질인 세로토닌,
                                            멜라토닌의 전구체로 이용.
                                        </TooltipDescription>
                                    </div>
                                }
                            >
                                <th>트립{'\n'}토판</th>
                            </Tooltip>
                            <Tooltip
                                title={
                                    <div>
                                        <TooltipDescription>
                                            1. 태아 신경관의 정상 발달에 필요.
                                        </TooltipDescription>
                                        <TooltipDescription>
                                            2. 세포와 혈액 생성에 필요.
                                        </TooltipDescription>
                                        <TooltipDescription>
                                            3. 혈액의 호모시스테인 수준을
                                            정상으로 유지하는데 필요.
                                        </TooltipDescription>
                                    </div>
                                }
                            >
                                <th>엽산</th>
                            </Tooltip>
                            <Tooltip
                                title={
                                    <div>
                                        <TooltipDescription>
                                            정상적인 엽산 대사에 필요.
                                        </TooltipDescription>
                                    </div>
                                }
                            >
                                <th>비타민{'\n'}B12</th>
                            </Tooltip>
                            <Tooltip
                                title={
                                    <div>
                                        <TooltipDescription>
                                            1.단백질 및 아미노산 이용에 필요.
                                        </TooltipDescription>
                                        <TooltipDescription>
                                            2. 혈액의 호모시스테인 수준을
                                            정상으로 유지하는데 필요
                                        </TooltipDescription>
                                    </div>
                                }
                            >
                                <th>비타민{'\n'}B6</th>
                            </Tooltip>
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
                                                              // 가중치 없이 1로 임시통일
                                                              numberOfCurated={
                                                                  weight[meal]
                                                              }
                                                              onClick={(e) => {
                                                                  setIsOpen(
                                                                      true
                                                                  );
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
                                                                  e.target
                                                                      .innerText
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
                    <BottomSheet
                        setIsOpen={setIsOpen}
                        clickedTag={clickedTag}
                    />
                ) : null}
            </div>
        </Container>
    );
};

export default Table;
