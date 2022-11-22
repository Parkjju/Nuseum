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

const RadarGraph = ({ dateCount, data, dataWithoutSupplement }) => {
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
                label: '영양제 + 음식(%)',
                data: [
                    ((+data.dha_epa / (300 * dateCount)) * 100).toFixed(1) > 100
                        ? 100
                        : ((+data.dha_epa / (300 * dateCount)) * 100).toFixed(
                              1
                          ),
                    ((+data.folic_acid / (180 * dateCount)) * 100).toFixed(1) >
                    100
                        ? 100
                        : (
                              (+data.folic_acid / (180 * dateCount)) *
                              100
                          ).toFixed(1),
                    ((+data.magnesium / (110 * dateCount)) * 100).toFixed(1) >
                    100
                        ? 100
                        : ((+data.magnesium / (110 * dateCount)) * 100).toFixed(
                              1
                          ),
                    ((+data.tryptophan / (100 * dateCount)) * 100).toFixed(1) >
                    100
                        ? 100
                        : (
                              (+data.tryptophan / (100 * dateCount)) *
                              100
                          ).toFixed(1),
                    ((+data.vitamin_a / (300 * dateCount)) * 100).toFixed(1) >
                    100
                        ? 100
                        : ((+data.vitamin_a / (300 * dateCount)) * 100).toFixed(
                              1
                          ),
                    ((+data.dietary_fiber / (20 * dateCount)) * 100).toFixed(
                        1
                    ) > 100
                        ? 100
                        : (
                              (+data.dietary_fiber / (20 * dateCount)) *
                              100
                          ).toFixed(1),
                    ((+data.vitamin_b6 / (0.7 * dateCount)) * 100).toFixed(1) >
                    100
                        ? 100
                        : (
                              (+data.vitamin_b6 / (0.7 * dateCount)) *
                              100
                          ).toFixed(1),
                    ((+data.vitamin_b12 / (1.1 * dateCount)) * 100).toFixed(1) >
                    100
                        ? 100
                        : (
                              (+data.vitamin_b12 / (1.1 * dateCount)) *
                              100
                          ).toFixed(1),
                    ((+data.vitamin_d / (5 * dateCount)) * 100).toFixed(1) > 100
                        ? 100
                        : ((+data.vitamin_d / (5 * dateCount)) * 100).toFixed(
                              1
                          ),
                ],
                fill: true,
                backgroundColor: 'rgba(190, 197, 198, 0.6)',
                borderColor: 'rgba(190, 197, 198, 0.6)',
                pointBackgroundColor: 'rgba(190, 197, 198, 0.6)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(190, 197, 198, 0.6)',
            },
            {
                label: '음식만(%)',
                data: [
                    (
                        (+dataWithoutSupplement.dha_epa / (300 * dateCount)) *
                        100
                    ).toFixed(1) > 100
                        ? 100
                        : (
                              (+dataWithoutSupplement.dha_epa /
                                  (300 * dateCount)) *
                              100
                          ).toFixed(1),
                    (
                        (+dataWithoutSupplement.folic_acid /
                            (180 * dateCount)) *
                        100
                    ).toFixed(1) > 100
                        ? 100
                        : (
                              (+dataWithoutSupplement.folic_acid /
                                  (180 * dateCount)) *
                              100
                          ).toFixed(1),
                    (
                        (+dataWithoutSupplement.magnesium / (110 * dateCount)) *
                        100
                    ).toFixed(1) > 100
                        ? 100
                        : (
                              (+dataWithoutSupplement.magnesium /
                                  (110 * dateCount)) *
                              100
                          ).toFixed(1),
                    (
                        (+dataWithoutSupplement.tryptophan /
                            (100 * dateCount)) *
                        100
                    ).toFixed(1) > 100
                        ? 100
                        : (
                              (+dataWithoutSupplement.tryptophan /
                                  (100 * dateCount)) *
                              100
                          ).toFixed(1),
                    (
                        (+dataWithoutSupplement.vitamin_a / (300 * dateCount)) *
                        100
                    ).toFixed(1) > 100
                        ? 100
                        : (
                              (+dataWithoutSupplement.vitamin_a /
                                  (300 * dateCount)) *
                              100
                          ).toFixed(1),
                    (
                        (+dataWithoutSupplement.dietary_fiber /
                            (20 * dateCount)) *
                        100
                    ).toFixed(1) > 100
                        ? 100
                        : (
                              (+dataWithoutSupplement.dietary_fiber /
                                  (20 * dateCount)) *
                              100
                          ).toFixed(1),
                    (
                        (+dataWithoutSupplement.vitamin_b6 /
                            (0.7 * dateCount)) *
                        100
                    ).toFixed(1) > 100
                        ? 100
                        : (
                              (+dataWithoutSupplement.vitamin_b6 /
                                  (0.7 * dateCount)) *
                              100
                          ).toFixed(1),
                    (
                        (+dataWithoutSupplement.vitamin_b12 /
                            (1.1 * dateCount)) *
                        100
                    ).toFixed(1) > 100
                        ? 100
                        : (
                              (+dataWithoutSupplement.vitamin_b12 /
                                  (1.1 * dateCount)) *
                              100
                          ).toFixed(1),
                    (
                        (+dataWithoutSupplement.vitamin_d / (5 * dateCount)) *
                        100
                    ).toFixed(1) > 100
                        ? 100
                        : (
                              (+dataWithoutSupplement.vitamin_d /
                                  (5 * dateCount)) *
                              100
                          ).toFixed(1),
                ],
                fill: true,
                backgroundColor: 'rgba(82, 89, 89, 0.6)',
                borderColor: 'rgba(82, 89, 89, 0.6)',
                pointBackgroundColor: 'rgba(82, 89, 89, 0.6)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(82, 89, 89, 0.6)',
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
                                boxWidth: 20,
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
