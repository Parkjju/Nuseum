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

const RadarGraph = ({ data }) => {
    let dataForRadar = {
        labels: [
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
                label: '권장섭취량 대비 실제섭취량(%)',
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
                    (+data.tryptophan / 0.1) * 100 > 100
                        ? 100
                        : (+data.tryptophan / 0.1) * 100,
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
                style={{ width: '80%', marginTop: 30, marginBottom: 30 }}
                data={dataForRadar}
            />
        </>
    );
};

export default RadarGraph;
