import styled from 'styled-components';

export const QuestionBox = styled.div`
    width: 80%;
`;

export const QuestionTitle = styled.p`
    width: 100%;
    height: 20px;
    margin-bottom: 12px;
`;

export const QuestionContent = styled.p`
    padding-left: 20px;
    font-size: 12px;
    line-height: 1.5;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(127, 140, 141, 0.7);
`;

export const AnswerBox = styled.div`
    width: 80%;
    height: auto;
`;
export const Answer = styled.div`
    box-sizing: border-box;
    width: 100%;
    background-color: rgb(238, 238, 238);
    border-bottom: 1px solid rgba(127, 140, 141, 0.7);
    padding: 20px;
`;

export const Username = styled.p`
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
export const AnswerContent = styled.p`
    font-size: 12px;
    font-weight: 100;
`;

export const InputComment = styled.input`
    margin-top: 10px;
    box-sizing: border-box;
    width: 80%;
    height: 40px;
    background-color: rgba(127, 140, 141, 0.15);
    font-size: 12px;
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
    margin-right: 5px;
`;
export const UtilGroup = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
