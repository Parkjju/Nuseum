import { useState } from 'react';
import { useEffect } from 'react';
import useCalculate from '../../../hooks/useCalculate';

const Table = ({ nutritionData, curationData, style }) => {
    console.log(nutritionData);
    console.log(curationData);

    // 3-5세 기준치
    const baseline = useCalculate('M', 5);

    // === 중복제거 리스트 및 가중치 초기화 ===
    const [weight, setWeight] = useState({});
    // const setData = (curationData) => {
    //     let arr = [];

    //     for (let obj of Object.values(curationData)) {
    //         for (let data of Object.keys(obj)) {
    //             arr.push(data);
    //         }
    //     }

    //     // 추천음식리스트 중복제거
    //     arr = [...Array.from(new Set(arr))];

    //     for (let obj of arr) {
    //         setWeight((prev) => {
    //             prev[obj] = 0;

    //             return { ...prev };
    //         });
    //     }
    // };

    // useEffect(() => {
    //     setData(curationData);
    // }, []);

    // =====

    const checkBaselineNutrition = () => {};

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
