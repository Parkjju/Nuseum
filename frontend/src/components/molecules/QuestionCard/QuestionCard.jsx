import { Link } from 'react-router-dom';
import { Box } from './QuesetionCard.style';

const QuestionCard = ({ data, isAnswered, id }) => {
    const currentWidth = window.innerWidth;
    return (
        <Box to={`./${id}`}>
            <p>
                <span style={{ fontSize: 16, marginRight: 5 }}>Q.</span>
                <span style={{ fontSize: 14, fontWeight: 100 }}>
                    {currentWidth < 300
                        ? data.length > 10
                            ? `${data.slice(0, 10)}...`
                            : data
                        : currentWidth < 480
                        ? data.length > 15
                            ? `${data.slice(0, 15)}...`
                            : data
                        : data.length > 25
                        ? `${data.slice(0, 25)}...`
                        : data}
                </span>
            </p>

            {isAnswered ? (
                <span style={{ fontSize: 14, fontWeight: 100 }}>답변 완료</span>
            ) : null}
        </Box>
    );
};

export default QuestionCard;
