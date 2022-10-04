import styled from 'styled-components';

export const Box = styled.div`
    width: 80%;
    padding-top: 50px;
    display: grid;
    @media all and (min-width: 390px) and (max-width: 480px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media all and (max-width: 389px) {
        grid-template-columns: repeat(2, 1fr);
    }
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    padding-bottom: 100px;
`;

export const IconBox = styled.div`
    height: 80px;
    width: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    background-color: ${(props) =>
        props.isEat ? '#EEEEEE' : props.isPoint ? '#BFC5C6' : null};
    border-radius: 20px;
    padding: 10px;
`;

export const Icon = styled.img`
    width: 2.5rem;
`;
export const IconWrapper = styled.div`
    /* background-color: ${(props) => (props.isEat ? '#dfdfdf' : null)}; */
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
    width: 80%;
    height: 50px;
`;

export const FetchButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.isClicked ? '#8D8D8D' : '#F9F9F9')};
    border-radius: 80px;
    color: ${(props) => (props.isClicked ? 'white' : 'black')};
    height: 100%;
    width: 6.25rem;
    font-size: 8px;
    border: none;
    cursor: pointer;
`;

export const SectionTitle = styled.div`
    width: 80%;
    padding: 10px 5px;
    font-size: 12px;
    font-weight: 600;
    border-bottom: 1px solid black;
    margin-top: 30px;
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
    width: 40%;
    min-height: 250px;
    min-width: 115px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;

export const Divider = styled.div`
    border-bottom: 1px solid #dcdfdf;
    width: 100%;
`;

export const Point = styled.p`
    color: white;
    font-size: 36px;
    font-weight: bold;
`;
