import styled from 'styled-components';

export const QuestionBox = styled.div`
    width: 84%;
    min-height: 20vh;
    padding-bottom: 30px;
`;

export const QuestionTitle = styled.p`
    width: 100%;
    height: 20px;
    margin-bottom: 12px;
`;

export const QuestionContent = styled.p`
    padding-left: 10px;
    font-size: 15px;
    line-height: 1.5;
    white-space: pre-line;
`;

export const AnswerBox = styled.div`
    width: 90%;
    height: auto;
    min-height: 10vh;
    margin-bottom: 30px;
`;
export const Answer = styled.div`
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(238, 238, 238 ,0.4);
    border-radius: 8px;
    padding: 15px;
`;

export const Username = styled.p`
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 15px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
export const AnswerContent = styled.p`
    font-weight: 100;
    font-size: 15px;
    line-height: 1.5;
    white-space: pre-wrap;
`;

export const InputComment = styled.textarea`
    margin-top: 20px;
    padding: 5px;
    box-sizing: border-box;
    width: 90%;
    min-height: 45px;
    height: auto;
    white-space: pre-line;
    background-color: rgba(127, 140, 141, 0.15);
    border-radius: 8px;
    font-size: 13px;
    padding-left: 20px;
    border: none;
    &:focus {
        outline: none;
    }
`;

export const UtilBtn = styled.span`
    font-size: 12px;
    color: #7f8c8d;
    border-bottom: 1px solid #7f8c8d;
`;
export const UtilImg = styled.img`
    width: 25px;
    // margin-right: 5px;
`;
export const UtilGroup = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
