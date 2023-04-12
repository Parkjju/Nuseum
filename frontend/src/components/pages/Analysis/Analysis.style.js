import styled from 'styled-components';

export const Box = styled.div`
    width: 70%;
    padding-top: 20px;
    display: grid;
    @media all and (max-width: 550px) {
        width: 85%;
    }
    @media all and (max-width: 490px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media all and (max-width: 340px) {
        grid-template-columns: repeat(2, 1fr);
    }
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    padding-bottom: 50px;
`;

export const IconBox = styled.div`
    height: 75px;
    width: 80px;
    margin: 0 2.5px 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) =>
        props.isEat
            ? 'rgba(238, 238, 238, 0.5)'
            : props.isPoint
            ? '#BFC5C6'
            : null};
    box-shadow: ${(props) =>
        props.isEat
            ? '3px 3px 4px rgba(70, 70, 70, 0.2)'
            : props.isPoint
            ? 'none'
            : null};
    border-radius: 20px;
    padding: 5px;
`;

export const Icon = styled.img`
    width: 2.2rem;
`;
export const IconWrapper = styled.div`
    background-color: ${(props) => (props.isEat ? '#dfdfdf' : null)};
    width: 4rem;
    height: 3.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;
`;
export const ButtonBox = styled.div`
    display: flex;
    margin-top: 50px;
    justify-content: space-between;
    width: 85%;
    @media all and (max-width: 480px) {
        width: 90%;
    }
    @media all and (max-width: 389px) {
        width: 97%;
    }
`;

export const FetchButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.isClicked ? '#fafafa' : 'transparent')};
    border-radius: 8px;
    color: black;
    width: 33.3%;
    padding: 16px 10px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    box-shadow: ${(props) =>
        props.isClicked ? '0px 3px 5px rgba(0, 0, 0, 0.2)' : 'none'};
`;

export const SectionTitle = styled.div`
    width: 80%;
    padding: 10px 5px;
    font-size: 12px;
    font-weight: 600;
    border-top: 1px dotted #8d8d8d;
    border-bottom: 1px dotted #8d8d8d;
    margin-top: 30px;
    @media all and (max-width: 680px) {
        width: 90%;
    }
`;
export const NutrientBox = styled.div`
    box-sizing: border-box;
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: center;
    max-width: 560px;
`;
export const NutrientList = styled.div`
    box-sizing: border-box;
    width: 75%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    span {
        padding: 10px 0px;
    }
    margin-bottom: 50px;
`;
export const NutrientDetail = styled.div`
    width: 102%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 70px;
    span{
        font-weight: 600;
        line-height: 1.3;
        width: 48.5%;
        background: #fafafa;
        padding: 5px 1px;
        border-radius: 5px;
        margin: 5px 0;
    }
`
export const NameDetail= styled.span`
    display: inline-block;
    width: 100% !important;
    padding-top: 4px;
    font-weight: 400 !important;
    font-size: 12px !important;
`
export const Divider = styled.div`
    border-bottom: 1px solid #dcdfdf;
    width: 100%;
`;

export const Point = styled.p`
    color: white;
    font-size: 36px;
    font-weight: bold;
    display: flex;
    align-items: baseline;
    justify-content: center;
`;

export const TooltipDescription = styled.p`
    line-height: 1.5;
    font-family: 'Noto Serif KR', serif;
`;
