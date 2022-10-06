import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);
ChartJS.defaults.font.size = 8;

const RadarGraph = ({ data }) => {
    let dataForRadar = {
        labels: [
            // 'A',
            // 'B',
            // 'C',
            // 'D',
            // 'E',
            // 'F',
            // 'G',
            // 'H',
            // 'I',
            // 'J',
            // 'K',
            // 'L',

            'DHA+EPA',
            '엽산',
            '마그네슘',
            '트립토판',
            '비타민 A',
            '식이섬유',
            '비타민 B6',
            '비타민 B12',
            '비타민 D',
        ],
        datasets: [
            {
                label: '충분/권장섭취량 대비 실제섭취량(%)',
                data: [
                    (+data.dha_epa / 300) * 100 > 100
                        ? 100
                        : (+data.dha_epa / 300) * 100,
                    (+data.folic_acid / 180) * 100 > 100
                        ? 100
                        : (+data.folic_acid / 180) * 100,
                    (+data.magnesium / 110) * 100 > 100
                        ? 100
                        : (+data.magnesium / 110) * 100,
                    (+data.tryptophan / 100) * 100 > 100
                        ? 100
                        : (+data.tryptophan / 100) * 100,
                    (+data.vitamin_a / 300) * 100 > 100
                        ? 100
                        : (+data.vitamin_a / 300) * 100,
                    (+data.dietary_fiber / 20) * 100 > 100
                        ? 100
                        : (+data.dietary_fiber / 20) * 100,
                    (+data.vitamin_b6 / 0.7) * 100 > 100
                        ? 100
                        : (+data.vitamin_b6 / 0.7) * 100,
                    (+data.vitamin_b12 / 1.1) * 100 > 100
                        ? 100
                        : (+data.vitamin_b12 / 1.1) * 100,
                    (+data.vitamin_d / 5) * 100 > 100
                        ? 100
                        : (+data.vitamin_d / 5) * 100,
                ],
                backgroundColor: '#BEC5C6',
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    };
    // let options = {
    //     responsive: false,
    // };
    return (
        <>
            <Radar
                style={{
                    marginTop: 30,
                    marginBottom: 30,
                    width: '100%',
                }}
                data={dataForRadar}
                options={{
                    plugins: {
                        title: {
                            align: 'center',
                        },
                        legend: {
                            labels: {
                                // This more specific font property overrides the global property
                                font: {
                                    family: 'Noto Serif KR,serif',
                                    size: 11,
                                },
                                boxWidth:20
                            },
                        },
                    },
                    scales: {
                        r: {
                            pointLabels: {
                                font: {
                                    family: 'Noto Serif KR,serif',
                                    size: 10,
                                },
                            },
                            max: 100,
                        },
                    },

                    elements: {
                        point: {
                            radius: 2,
                        },
                    },
                }}
            />
        </>
    );
};

export default RadarGraph;
