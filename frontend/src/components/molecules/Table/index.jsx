import { useState } from 'react';
import { useEffect } from 'react';
import useCalculate from '../../../hooks/useCalculate';

const Table = ({
    curationData,
    inSufficientDiversity,
    inSufficientNutrition,
    style,
}) => {
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
    // 좌표관리 상태값
    const [coordinates, setCoordinates] = useState([]);

    // === 중복제거 리스트 및 가중치 초기화 ===
    const [weight, setWeight] = useState({});

    // =====

    // 좌표정렬
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
        setCurationList((prev) => {
            for (let coordinate of coordinates) {
                prev[coordinate.split('.')[0]][coordinate] =
                    curationData[coordinate];
            }
            return { ...prev };
        });
    }, [curationData, coordinates]);

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
                                    {Object.values(
                                        curationList[diversityCoordinate]
                                    ).map((cellData) => (
                                        <td>
                                            {cellData
                                                ? Object.keys(cellData).map(
                                                      (meal) => (
                                                          <span>{meal}</span>
                                                      )
                                                  )
                                                : null}
                                        </td>
                                    ))}
                                </th>
                            </tr>
                        )
                    )}
                    <tr>
                        <th>채소</th>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                    </tr>
                    <tr>
                        <th>과일</th>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                    </tr>
                    <tr>
                        <th>콩/두부</th>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                    </tr>
                    <tr>
                        <th>통곡물</th>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                    </tr>
                    <tr>
                        <th>버섯</th>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                    </tr>
                    <tr>
                        <th>해조류</th>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                    </tr>
                    <tr>
                        <th>견과</th>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                    </tr>
                    <tr>
                        <th>고기/어패류/달걀</th>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                    </tr>
                    <tr>
                        <th>유제품</th>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                        <td>Cell Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
