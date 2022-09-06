import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const BarGraph = ({ data }) => {
    const labelsForBar = ['실제 섭취율', '권장 섭취율'];
    const optionsForBar = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 1,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: '탄수화물 단백질 지방 섭취율',
            },
        },
        scales: {
            y: {
                stacked: true,
            },
            x: {
                stacked: true,
            },
        },
    };
    const dataForBar = {
        labels: labelsForBar,
        datasets: [
            {
                label: '탄수화물',
                data: [
                    [0, ((data.carbohydrate / 130) * 100).toFixed(0)],
                    [0, 55],
                ],
                backgroundColor: '#BEC5C6',
            },
            {
                label: '단백질',
                data: [
                    [0, ((data.protein / 25) * 100).toFixed(0)],
                    [0, 25],
                ],
                backgroundColor: '#7f8c8d',
            },
            {
                label: '지방',
                data: [
                    [0, ((data.fat / 102) * 100).toFixed(0)],
                    [0, 20],
                ],
                backgroundColor: '#525959',
            },
        ],
    };
    return (
        <Bar
            style={{ width: '80%' }}
            data={dataForBar}
            options={optionsForBar}
        />
    );
};

export default BarGraph;
