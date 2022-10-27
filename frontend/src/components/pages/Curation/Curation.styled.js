import styled from 'styled-components';

export const CurationBox = styled.div`
    width: 100%;
    height: auto;
`;

export const CurationType = styled.div`
    background-color: rgba(238, 238, 238, 0.5);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 5px;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`;
export const CurationTypeImage = styled.img`
    height: 40px;
    width: 40px;
    margin-right: 10px;
`;
export const CurationTypeName = styled.span`
    font-size: 14px;
`;

export const CurationFood = styled.div`
    width: 100%;
    height: auto;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid #eeeeee;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;

export const CurationFoodTitle = styled.span`
    font-size: 14px;
    max-width: 60%;
    font-weight: 500;
    text-decoration: underline;
    text-align: center;
    line-height: 1.5;
`;
export const CurationFoodList = styled.div`
    min-height: 60px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: flex-start;
    text-align: center;
    margin-top: 15px;
    font-size: 12px;
    font-weight: 100;
    grid-auto-rows: auto;
    padding: 5px;
`;

export const CommentBox = styled.div`
    width: 80%;
    height: auto;
    padding: 30px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #e5e5e5;
    font-size: 14px;
    line-height: 2;
    margin-top: 50px;
    border-radius: 30px;
    white-space: pre-line;
`;

export const WarningBox = styled.div`
    width: 80%;
    min-height: 110px;
    max-width: 430px;
    background-color: #f7f7f7;
    margin: 0 auto;
    border-radius: 30px;
    padding: 20px 30px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const WarningTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    align-items: center;
`;

export const WarningList = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: flex-start;
    row-gap: 10px;
`;
export const WarningFood = styled.span`
    font-size: 13px;
    font-weight: 100;
    line-height: 1.5;
`;
export const WarningMain = styled.span`
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-line;
    text-align: center;
    text-decoration: underline;
    font-weight: 500;
`;

export const CurationDataWrapper = styled.div`
    width: 80%;
    max-width: 430px;
    display: grid;
    column-gap: 10px;
    row-gap: 30px;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 30px;
`;

export const Title = styled.p`
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin: 20px 0;
`;
export const HashTag = styled.a`
    text-decoration: none;
    color: #656f70;
    &:hover {
        opacity: 0.6;
    }
`;
