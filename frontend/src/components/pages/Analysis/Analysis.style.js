import styled from 'styled-components';

export const Box = styled.div`
    width: 80%;
    padding-top: 50px;
    display: grid;
    @media all and (max-width: 550px) {
        width: 91%;
    }
    @media all and (max-width: 490px){
        grid-template-columns: repeat(3, 1fr); 
    }
    @media all and (max-width: 340px) {
        grid-template-columns: repeat(2, 1fr);
    }
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    padding-bottom: 100px;
`;

export const IconBox = styled.div`
    height: 88px;
    width: 80px;
    margin: 0 2.5px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) =>
        props.isEat ? 'rgba(238, 238, 238, 0.5)' : props.isPoint ? '#BFC5C6' : null};
    box-shadow: ${(props) => 
        props.isEat ? '0px 3px 3px rgba(0, 0, 0, 0.1)' : props.isPoint ? 'none' : null};
    border-radius: 20px;
    padding: 10px;
`;

export const Icon = styled.img`
    width: 2.5rem;
`;
export const IconWrapper = styled.div`
    background-color: ${(props) => (props.isEat ? '#dfdfdf' : null)};
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;
    margin-bottom: 10px;
`;
export const ButtonBox = styled.div`
    display: flex;
    padding-top: 50px;
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
    background-color: ${(props) => (props.isClicked ? '#8D8D8D' : '#f1f1f1')};
    border-radius: 80px;
    color: ${(props) => (props.isClicked ? 'white' : 'black')};
    width: 33.3%;
    padding: 10px 3px;
    font-size: 8px;
    border: none;
    cursor: pointer;
    box-shadow: ${(props) => (props.isClicked ? '0px 3px 3px rgba(0, 0, 0, 0.2)' : 'none')};
    span{
        font-size: 12px;
        @media all and (max-width: 480px) {
            font-size: 11px;
        }
        @media all and (max-width: 389px) {
            font-size: 10px;
        }
    }
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
    justify-content: space-between;
    align-items: center;
    max-width: 560px;
`;
export const NutrientList = styled.div`
    box-sizing: border-box;
    width: 29%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    span{
        padding: 8px 0;
        @media all and (max-width: 390px) {
            font-size: 11px;
            padding: 6px 0;
        }
        @media all and (max-width: 320px) {
            font-size: 10px;
            padding: 4px 0;
        }
    }
`;

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
