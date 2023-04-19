import { Container } from '@mui/system';
import { DiaryTitle } from '../../pages/Record/styled';
import { Name } from '../../atom/Card/styled';
import { useState } from 'react';
import { useEffect } from 'react';
import useCalculate from '../../../hooks/useCalculate';
import BottomSheet from '../BottomSheet/BottomSheet';
import {
    CurationMeal,
    CurationMealWrapper,
    CurationTd,
    CurationWith,
} from './Table.styled';

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

    const [nutCurationList, setNutCurationList] = useState({
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

    /////////////////////////골고루지수 채웠지만 영양성분 충족x by hj
    const [nutCoordinates, setNutCoordinates] = useState([]);
    const [weiWeight, setWeiWeight] = useState({});

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
                    `${nutrition}.${diversity}`,
                ]);
            }
            /////////////////////// 골고루지수를 채웠어도 영양성분 충족이 되지 않은 좌표 by hj
            for (let i = 0; i < 9; i++){
                setNutCoordinates((prev)=>[
                    ...prev,
                    `${nutrition}.${i}`,
                ]);
            }
        }
    }, [inSufficientDiversity, inSufficientNutrition]);

    // 좌표정렬 후 큐레이션 대상 딕셔너리 정의
    useEffect(() => {
        
        /////////////////////// 골고루지수를 채웠어도 영양성분 충족이 되지 않은 좌표(골고루지수 제외) by hj
        coordinates.forEach(function(item){
            let index = nutCoordinates.indexOf(item);
            if(index !== -1){
                nutCoordinates.splice(index,1);
            }
        })
        setNutCurationList((prev) => {
            for (let nut of nutCoordinates){
                prev[nut.split('.')[0]][nut] =
                curationData[nut];
            }
            return {...prev};
        });

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
                return '식이섬유\n(g)';
            case '1':
                return '비타민\nD\n(㎍)';
            case '2':
                return 'DHA\n+EPA\n(mg)';
            case '3':
                return '마그네슘\n(mg)';
            case '4':
                return '비타민\nA\n(㎍)';
            case '5':
                return '트립토판\n(mg)';
            case '6':
                return '엽산\n(㎍)';
            case '7':
                return '비타민\nB12\n(㎍)';
            case '8':
                return '비타민\nB6\n(mg)';
        }
    };

    const tooltipContents = {
        식이섬유: '장내미생물의 먹이로 이용 | 장내미생물-장-뇌 축에 작용 | 배변활동 원활에 도움을 줄수 있음',
        비타민D:
            '뼈의 형성과 유지에 필요 | 칼슘&인의 흡수와 이용에 필요 | 골다공증 발생 위험 감소에 도움을 줌',
        'DHA+EPA':
            '뇌 구조 및 기능에 관여 | 기억력 개선 도움에 도움을 줄 수 있음 | 혈중 중성지질&혈행개선에 도움을 줄 수 있음 | 건조한 눈을 개선하여 눈건강에 도움을 줄 수 있음',
        마그네슘: '신경과 근육 기능 유지에 필요 | 에너지 이용에 필요',
        비타민A:
            '정상적인 배아 발달에 필요 | 상피세포의 성장과 발달에 필요 | 피부와 점막 형성&기능유지에 필요 | 어두운 곳에서 시각 적응을 위해 필요',
        트립토판: '신경전달물질인 세로토닌&멜라토닌의 전구체로 이용',
        엽산: '태아 신경관의 정상 발달에 필요 | 세포와 혈액 생성에 필요 | 혈액의 호모시스테인 수준을 정상으로 유지하는데 필요',
        비타민B12: '정상적인 엽산 대사에 필요',
        비타민B6:
            '단백질 및 아미노산 이용에 필요 | 혈액의 호모시스테인 수준을 정상으로 유지하는데 필요',
    };

    const cookingMeal = {
        '샐러드' : '요거트, 연어, 아보카도, 리코타치즈, 닭가슴살, 야채',
        '비빔밥' : '야채, 소고기, 달걀',
        '우거지 소고기국' : '우거지, 소고기',
        '고추잡채' : '피망, 파프리카, 버섯류, 야채, 돼지고기',
        '두부버섯전골' : '두부, 버섯, 소고기',
        '유부초밥' : '유부, 야채',
        '그래놀라 그릭요거트' : '통곡물, 견과류, 그릭요거트',
        '버섯불고기전골' : '버섯, 소고기',
        '미역국' : '북어, 매생이, 전복, 조개, 가자미, 소고기',
        '고등어구이' : '고등어',
        '오징어볶음' : '오징어, 양배추, 당근, 깻잎, 마늘',
        '황태해장국' : '황태, 두부, 달걀, 콩나물',
        '오리주물럭' : '오리고기, 야채, 마늘',
        '시금치프리타타' : '시금치, 토마토, 달걀, 베이컨',
        '취나물들깨볶음' : '취나물, 들깨',
        '버섯애호박볶음' : '버섯류, 애호박',
        '멸치견과류볶음' : '멸치, 견과류, 참깨',
        '메추리알장조림' : '메추리알, 소고기, 마늘',
    };

    const ProcessedFood = {
        '풀무원 리코타 고구마 SMIX 브런치 샐러드' : '고구마, 리코타치즈, 견과류',
        '포켓샐러드 쉬림프 씨위드 두부면 샐러드' : '야채, 고구마, 두부면, 새우, 해조류',
        '스윗밸런스 연어와 리코타 치즈 발사믹 샐러드' : '연어, 리코타치즈, 야채',
        '바르닭 닭가슴살 곤약볶음밥 귀리&간장 계란밥' : '귀리, 달걀, 닭고기',
        '정미경키친 비빔밥세트' : '고사리, 취나물, 애호박, 버섯, 소고기',
        '채선당 월남쌈 밀키트' : '당근, 양배추, 깻잎, 소고기',
        '프레시지 밀푀유 나베 밀키트' : '버섯, 야채, 소고기',
        '청정원 소고기버섯만두전골' : '버섯, 야채, 만두, 소고기',
        '프레시밀 바지락 된장찌개' : '바지락, 애호박, 두부',
        '한상 가득 비비고 생선구이&순두부한상' : '고등어, 두부, 호박, 버섯, 김',
        '곰곰 궁중식 찜닭 밀키트' : '당근, 양배추, 닭고기',
        '마이셰프 훈제 오리 무쌈' : '오리고기, 야채',
        '본죽 쇠고기메추리알장조림' : '메추리알, 소고기',
        '비비고 플랜테이블 왕교자' : '야채, 대체육',        
        '닥터넛츠 오리지널뉴 신선하루한줌견과' : '아몬드, 캐슈넛, 피스타치오넛',  
    }
    return (
        <Container
            style={{
                padding: '0 4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <DiaryTitle
                style={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}
            >
                <Name style={{ fontSize: '20px' }}>맞춤식품</Name>
            </DiaryTitle>
            <Name style={{ fontSize: '13px',fontWeight: 400,
                lineHeight: 1.2, marginBottom: '60px',
                textAlign:'justify', width: '85%', background: '#f1f1f1',
                padding: '10px',
                borderRadius: '5px',
                width: '80%'}}>
                식이일기를 작성해 주시면, 지난 한주의 식이내용이 그림자로 채워지고 
                부족한 식이내용을 장보기 및 음식주문에 활용할 수 있습니다. ( ), 100g 당 함량
            </Name>
            <Name style={{ fontSize: '16px', marginBottom: '25px' }}>
                식재료
            </Name>
            <div
                style={{ ...style, marginBottom: '70px' }}
                role='region'
                aria-label='data table'
                tabindex='0'
                class='primary'
            >
                <table>
                    <thead>
                        <tr>
                            <th class='pin'></th>
                            <th>채소</th>
                            <th>과일</th>
                            <th>콩{'\n'}두부</th>
                            <th>통곡물</th>
                            <th>버섯</th>
                            <th>해조류</th>
                            <th>견과</th>
                            <th>고기{'\n'}생선{'\n'}달걀</th>
                            <th>유제품</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.keys(curationList).map(
                            (diversityCoordinate, index) => (
                                <tr>
                                    <Tooltip
                                        title={
                                            <div>
                                                <TooltipDescription>
                                                    {
                                                        tooltipContents[
                                                            getTitleHeader(
                                                                diversityCoordinate
                                                            )
                                                        ]
                                                    }
                                                </TooltipDescription>
                                            </div>
                                        }
                                    >
                                        <th key={index}>
                                            {getTitleHeader(
                                                diversityCoordinate
                                            )}
                                        </th>
                                    </Tooltip>

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
                                                                      e.target.innerText.split('(')[0]
                                                                  );
                                                              }}
                                                          >
                                                              {meal}
                                                          </CurationMeal>
                                                      )
                                                  )
                                                : nutCurationList[
                                                      diversityCoordinate
                                                  ][cellData[0]]

                                                //// 골고루지수는 충족하여도 영양성분은 충족x by hj
                                                ? Object.keys(
                                                    nutCurationList[diversityCoordinate][cellData[0]]
                                                    ).map(
                                                    (meal) => (
                                                        <CurationMeal
                                                            nutCurated = {true}
                                                            onClick={(e) => {
                                                                setIsOpen(true);
                                                                setClickedTag(
                                                                    e.target.innerText.split('(')[0]
                                                                );
                                                            }}>
                                                                {meal}
                                                            </CurationMeal>
                                                    )
                                                ): notCuratedList[
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
                                                                  e.target.innerText.split('(')[0]
                                                              );
                                                          }}
                                                      >
                                                          {meal}
                                                      </CurationMeal>
                                                  ))
                                                :null
                                            }
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
            {/* 임시로 추가한 추천 요리, 보충제 레이아웃 */}
            <CurationWith>
                <Name style={{ fontSize: '16px', margin: '25px 0 15px' }}>음식</Name>
                <Name
                    style={{
                        fontSize: '13px',
                        fontWeight: 300,
                        marginBottom: '20px',
                    }}
                >
                    추후 서비스의 예입니다:) 배달앱에서도 활용해보세요
                </Name>
                <ul>
                    {Object.keys(cookingMeal).map((index) => (
                            <li>
                                <Name onClick={(e) => {
                                setIsOpen(true);
                                    setClickedTag(e.target.innerText);}}
                                style={{fontSize: 'inherit',fontWeight: 500,cursor:'pointer', padding: '10px 0', lineHeight: 1.1}}>
                                    {index}
                                </Name>
                                <Name style={{fontSize: '11px',fontWeight: 200}}>
                                    {cookingMeal[index]}
                                </Name>
                            </li>
                            ))
                    }
                </ul>
            </CurationWith>
            <CurationWith>
                <Name style={{ fontSize: '16px', margin: '25px 0 15px' }}>
                    가공식품
                </Name>
                <Name
                    style={{
                        fontSize: '13px',
                        fontWeight: 300,
                        marginBottom: '20px',
                    }}
                >
                    추후 서비스의 예입니다 :)
                </Name>
                <ul>
                    {Object.keys(ProcessedFood).map((index) => (
                            <li>
                                <Name onClick={(e) => {
                                setIsOpen(true);
                                    setClickedTag(e.target.innerText);}}
                                style={{fontSize: 'inherit',fontWeight: 500,cursor:'pointer', padding: '10px 0', lineHeight: 1.1}}>
                                    {index}
                                </Name>
                                <Name style={{fontSize: '11px',fontWeight: 200}}>
                                    {ProcessedFood[index]}
                                </Name>
                            </li>
                            ))
                    }
                </ul>
            </CurationWith>
            <CurationWith>
                <Name style={{ fontSize: '16px', margin: '25px 0 15px' }}>보충제</Name>
                <Name
                    style={{
                        fontSize: '13px',
                        fontWeight: 300,
                        marginBottom: '20px',
                    }}
                >
                    추후 추가될 예정입니다 :)
                </Name>
                <ul>
                    <li></li>
                    <li></li>
                </ul>
            </CurationWith>
        </Container>
    );
};

export default Table;
