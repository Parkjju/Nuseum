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
import { useSelector } from 'react-redux';
import { TooltipDescription } from '../../pages/Analysis/Analysis.style';
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);
ChartJS.defaults.font.size = 11;

const RadarGraph = ({ dateCount, data, dataWithoutSupplement }) => {
    const lang = useSelector((state) => state.language.isKorean);
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
            lang ? 'Folic acid' : '엽산',
            lang ? 'Magnesium' : '마그네슘',
            lang ? 'Tryptophan' : '트립토판',
            lang ? 'Vitamin A' : '비타민A',
            lang ? 'Dietary fiber' : '식이섬유',
            lang ? 'Vitamin B6' : '비타민B6',
            lang ? 'Vitamin B12' : '비타민B12',
            lang ? 'Vitamin D' : '비타민D',
        ],
        datasets: dataWithoutSupplement
            ? [
                  {
                      label: lang
                          ? 'Supplements + Meal(%)'
                          : '영양제 + 음식(%)',
                      data: [
                          ((+data.dha_epa / (300 * dateCount)) * 100).toFixed(
                              1
                          ) > 100
                              ? 100
                              : (
                                    (+data.dha_epa / (300 * dateCount)) *
                                    100
                                ).toFixed(1),
                          (
                              (+data.folic_acid / (180 * dateCount)) *
                              100
                          ).toFixed(1) > 100
                              ? 100
                              : (
                                    (+data.folic_acid / (180 * dateCount)) *
                                    100
                                ).toFixed(1),
                          ((+data.magnesium / (110 * dateCount)) * 100).toFixed(
                              1
                          ) > 100
                              ? 100
                              : (
                                    (+data.magnesium / (110 * dateCount)) *
                                    100
                                ).toFixed(1),
                          (
                              (+data.tryptophan / (100 * dateCount)) *
                              100
                          ).toFixed(1) > 100
                              ? 100
                              : (
                                    (+data.tryptophan / (100 * dateCount)) *
                                    100
                                ).toFixed(1),
                          ((+data.vitamin_a / (300 * dateCount)) * 100).toFixed(
                              1
                          ) > 100
                              ? 100
                              : (
                                    (+data.vitamin_a / (300 * dateCount)) *
                                    100
                                ).toFixed(1),
                          (
                              (+data.dietary_fiber / (20 * dateCount)) *
                              100
                          ).toFixed(1) > 100
                              ? 100
                              : (
                                    (+data.dietary_fiber / (20 * dateCount)) *
                                    100
                                ).toFixed(1),
                          (
                              (+data.vitamin_b6 / (0.7 * dateCount)) *
                              100
                          ).toFixed(1) > 100
                              ? 100
                              : (
                                    (+data.vitamin_b6 / (0.7 * dateCount)) *
                                    100
                                ).toFixed(1),
                          (
                              (+data.vitamin_b12 / (1.1 * dateCount)) *
                              100
                          ).toFixed(1) > 100
                              ? 100
                              : (
                                    (+data.vitamin_b12 / (1.1 * dateCount)) *
                                    100
                                ).toFixed(1),
                          ((+data.vitamin_d / (5 * dateCount)) * 100).toFixed(
                              1
                          ) > 100
                              ? 100
                              : (
                                    (+data.vitamin_d / (5 * dateCount)) *
                                    100
                                ).toFixed(1),
                      ],
                      fill: true,
                      backgroundColor: 'rgba(190, 197, 198, 0.6)',
                      borderColor: 'rgba(190, 197, 198, 0.6)',
                      pointBackgroundColor: 'rgba(190, 197, 198, 0.6)',
                      pointBorderColor: '#525959',
                      pointHoverBackgroundColor: '#fff',
                      pointHoverBorderColor: '#525959',
                  },
                  {
                      label: lang ? 'Just Meal(%)' : '음식만(%)',
                      data: [
                          (
                              (+dataWithoutSupplement.dha_epa /
                                  (300 * dateCount)) *
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
                              (+dataWithoutSupplement.magnesium /
                                  (110 * dateCount)) *
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
                              (+dataWithoutSupplement.vitamin_a /
                                  (300 * dateCount)) *
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
                              (+dataWithoutSupplement.vitamin_d /
                                  (5 * dateCount)) *
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
              ]
            : [
                  {
                      label: lang
                          ? 'Supplements + Meal(%)'
                          : '영양제 + 음식(%)',
                      data: [
                          ((+data.dha_epa / (300 * dateCount)) * 100).toFixed(
                              1
                          ) > 100
                              ? 100
                              : (
                                    (+data.dha_epa / (300 * dateCount)) *
                                    100
                                ).toFixed(1),
                          (
                              (+data.folic_acid / (180 * dateCount)) *
                              100
                          ).toFixed(1) > 100
                              ? 100
                              : (
                                    (+data.folic_acid / (180 * dateCount)) *
                                    100
                                ).toFixed(1),
                          ((+data.magnesium / (110 * dateCount)) * 100).toFixed(
                              1
                          ) > 100
                              ? 100
                              : (
                                    (+data.magnesium / (110 * dateCount)) *
                                    100
                                ).toFixed(1),
                          (
                              (+data.tryptophan / (100 * dateCount)) *
                              100
                          ).toFixed(1) > 100
                              ? 100
                              : (
                                    (+data.tryptophan / (100 * dateCount)) *
                                    100
                                ).toFixed(1),
                          ((+data.vitamin_a / (300 * dateCount)) * 100).toFixed(
                              1
                          ) > 100
                              ? 100
                              : (
                                    (+data.vitamin_a / (300 * dateCount)) *
                                    100
                                ).toFixed(1),
                          (
                              (+data.dietary_fiber / (20 * dateCount)) *
                              100
                          ).toFixed(1) > 100
                              ? 100
                              : (
                                    (+data.dietary_fiber / (20 * dateCount)) *
                                    100
                                ).toFixed(1),
                          (
                              (+data.vitamin_b6 / (0.7 * dateCount)) *
                              100
                          ).toFixed(1) > 100
                              ? 100
                              : (
                                    (+data.vitamin_b6 / (0.7 * dateCount)) *
                                    100
                                ).toFixed(1),
                          (
                              (+data.vitamin_b12 / (1.1 * dateCount)) *
                              100
                          ).toFixed(1) > 100
                              ? 100
                              : (
                                    (+data.vitamin_b12 / (1.1 * dateCount)) *
                                    100
                                ).toFixed(1),
                          ((+data.vitamin_d / (5 * dateCount)) * 100).toFixed(
                              1
                          ) > 100
                              ? 100
                              : (
                                    (+data.vitamin_d / (5 * dateCount)) *
                                    100
                                ).toFixed(1),
                      ],
                      fill: true,
                      backgroundColor: 'rgba(190, 197, 198, 0.6)',
                      borderColor: 'rgba(190, 197, 198, 0.6)',
                      pointBackgroundColor: 'rgba(190, 197, 198, 0.6)',
                      pointBorderColor: '#fff',
                      pointHoverBackgroundColor: '#fff',
                      pointHoverBorderColor: 'rgba(190, 197, 198, 0.6)',
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
                    marginBottom: 15,
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
                                    size: 12,
                                },
                                boxWidth: 20,
                            },
                        },
                        tooltip: {
                            callbacks: {
                                afterTitle: (tooltipItem) => {
                                    switch (tooltipItem[0].label) {
                                        case '비타민B12':
                                            return '정상적인 엽산 대사에 필요';
                                        case '비타민B6':
                                            return '1. 단백질 및 아미노산 이용에 필요\n2. 혈액의 호모시스테인 수준을 정상으로 유지하는데 필요';
                                        case '식이섬유':
                                            return '배변활동 원활에 도움을 줄 수 있음';
                                        case '비타민D':
                                            return '칼슘과 인이 흡수되고 이용되는데 필요, 뼈의 형성과 유지에 필요, 골다공증 발생 위험 감소에 도움을 줌.';
                                        case '트립토판':
                                            return '신경전달물질인 세로토닌, 멜라토닌의 전구체로 이용되는 필수 아미노산';
                                        case '비타민A':
                                            return '1. 어두운 곳에서 시각 적응을 위해 필요\n2. 피부와 점막을 형성하고 기능을 유지하는데 필요\n3. 상피세포의 성장과 발달에 필요';
                                        case '마그네슘':
                                            return '1. 에너지 이용에  필요\n2. 신경과 근육 기능 유지에 필요';
                                        case 'DHA+EPA':
                                            return '혈중 중성지질, 혈행개선에 도움을 줄 수 있음, 기억력 개선에 도움을 줄 수 있음, 건조한 눈을 개선하여 눈 건강에 도움을 줄 수 있음';
                                        case '엽산':
                                            return '1. 세포와 혈액 생성에 필요\n2. 태아 신경관의 정상 발달에 필요\n3. 혈액의 호모시스테인 수준을 정상으로 유지하는데 필요';
                                    }
                                },
                            },
                        },
                    },

                    scales: {
                        r: {
                            pointLabels: {
                                font: {
                                    family: 'Noto Serif KR,serif',
                                    size: 11,
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
