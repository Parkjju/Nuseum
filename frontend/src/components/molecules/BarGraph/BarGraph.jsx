import { padding } from '@mui/system';
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
const BarGraph = ({ count, data }) => {
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
                align: 'end',             
                labels: {
                    font: {
                        family: 'Noto Serif KR,serif',
                        size: 10
                    },
                    boxWidth: 25
                }
            },
            title: {
                display: true,
                text: '탄수화물 단백질 지방 섭취율    ',
                align: 'end', 
                font:{
                    family: 'Noto Serif KR,serif',
                    size: 12,
                    weight: 500,
                },
            },
        },
        scales: {
            y: {
                stacked: true,
                ticks:{
                    font: {
                        family: 'Noto Serif KR,serif',
                        size: 10
                    }
                }
            },
            x: {
                stacked: true,
                ticks:{
                    font: {
                        family: 'Noto Serif KR,serif',
                        size: 10,
                    }
                }
            },
        },
    };

    let datasetForBar = [
        (
            (+data.carbohydrate /
                (+data.protein + +data.carbohydrate + +data.fat)) *
            100
        ).toFixed(0),
        (
            (+data.protein / (+data.protein + +data.carbohydrate + +data.fat)) *
            100
        ).toFixed(0),
        (
            (+data.fat / (+data.protein + +data.carbohydrate + +data.fat)) *
            100
        ).toFixed(0),
    ];
    datasetForBar = datasetForBar.map((item) => +item);

    if (datasetForBar.reduce((acc, cur) => +acc + +cur) > 100) {
        datasetForBar[datasetForBar.indexOf(Math.max(...datasetForBar))] -=
            datasetForBar.reduce((acc, cur) => +acc + +cur) - 100;
    } else {
        datasetForBar[datasetForBar.indexOf(Math.min(...datasetForBar))] +=
            100 - datasetForBar.reduce((acc, cur) => +acc + +cur);
    }

    const dataForBar = {
        labels: labelsForBar,
        datasets: [
            {
                label: '탄수화물',
                data: [
                    [0, datasetForBar[0]],
                    [0, 55],
                ],
                backgroundColor: '#BEC5C6',
            },
            {
                label: '단백질',
                data: [
                    [0, datasetForBar[1]],
                    [0, 25],
                ],
                backgroundColor: '#7f8c8d',
            },
            {
                label: '지방',
                data: [
                    [0, datasetForBar[2]],
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
