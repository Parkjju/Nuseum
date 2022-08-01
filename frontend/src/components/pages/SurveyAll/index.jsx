import Survey from '../../molecules/Survey';
import { data } from '../../../assets/survey';

function SurveyAll() {
    return (
        <>
            {data.map((item, index) => (
                <Survey key={index} description={item.description} />
            ))}
        </>
    );
}

export default SurveyAll;
