import styled from 'styled-components';

export const CurationBox = styled.div`
    border: 1px solid #eeeeee;
    width: 80%;
    height: 120px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    display: flex;
    align-items: center;
    flex-direction: row;
    max-width: 430px;
    margin-bottom: 15px;
`;

export const CurationType = styled.div`
    background-color: rgba(238, 238, 238, 0.5);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 5px;
    height: 100%;
    min-width: 96px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    /* margin-right: 60px; */
    position: relative;
    left: 0;
    @media all and (min-width: 420px) {
        margin-right: 30px;
    }
`;
export const CurationTypeImage = styled.img`
    height: 40px;
    width: 40px;
    margin-bottom: 10px;
`;
export const CurationTypeName = styled.span`
    font-size: 14px;
`;

export const CurationFood = styled.div`
    width: auto;
    height: 80px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const CurationFoodTitle = styled.span`
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid black;
    text-align: center;
`;
export const CurationFoodList = styled.div`
    height: 60px;
    min-width: 210px;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    text-align: center;
    margin-top: 15px;
    font-size: 12px;
`;

export const CommentBox = styled.div`
    width: 80%;
    height: auto;
    padding: 30px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e3e3e3;
    font-size: 14px;
    line-height: 2;
`;
