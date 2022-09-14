import { Box } from './QuesetionCard.style';

const QuestionCard = ({ data, isAnswered }) => {
    return (
        <Box>
            <p>
                <span style={{ fontSize: 16, marginRight: 5 }}>Q.</span>
                <span style={{ fontSize: 14, fontWeight: 100 }}>
                    {data.length > 20 ? `${data.slice(0, 20)}...` : data}
                </span>
            </p>

            {isAnswered ? (
                <span style={{ fontSize: 14, fontWeight: 100 }}>답변 완료</span>
            ) : null}
        </Box>
    );
};

export default QuestionCard;
