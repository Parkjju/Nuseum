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
    height: 35px;
    width: 35px;
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
    max-width: 90%;
    font-weight: 500;
    text-decoration: underline;
    text-align: center;
    line-height: 1.5;
    cursor: pointer;
`;
export const CurationFoodList = styled.div`
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    font-weight: 100;
    padding: 0 5px;
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
    line-height: 1.7;
    margin-top: 35px;
    border-radius: 30px;
    white-space: pre-line;
`;

export const WarningBox = styled.div`
    width: 90%;
    min-height: 110px;
    max-width: 480px;
    background-color: #f7f7f7;
    margin: 0 auto;
    border-radius: 30px;
    padding: 10px 10px 5px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    margin-bottom: 40px;
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
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
`;
export const WarningFood = styled.span`
    font-size: 13px;
    font-weight: 100;
    line-height: 1.5;
    padding: 10px;
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
    width: 90%;
    max-width: 480px;
    display: grid;
    column-gap: 10px;
    row-gap: 30px;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 30px;
`;

export const Title = styled.div`
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 20px;
`;
export const HashTag = styled.a`
    text-decoration: none;
    color: #656f70;
    &:hover {
        opacity: 0.6;
    }
`;

export const SubTitle = styled.p`
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 20px;
`;
