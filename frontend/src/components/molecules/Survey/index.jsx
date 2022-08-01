import Option from '../../atom/Option';
import { QuestionBody, QuestionBox, QuestionHeader } from './styled';

function Survey() {
    return (
        <QuestionBox>
            <QuestionHeader>
                1. 귀하의 자녀는 한 번 식사할 때 채소류 반찬(김치포함) 을 몇
                가지나 먹나요?
            </QuestionHeader>
            <QuestionBody>
                <Option></Option>
                <Option></Option>
                <Option></Option>
                <Option></Option>
                <Option></Option>
            </QuestionBody>
        </QuestionBox>
    );
}

export default Survey;
