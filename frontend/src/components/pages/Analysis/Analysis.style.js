import styled from 'styled-components';

export const Box = styled.div`
    width: 80%;
    padding-top: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    padding-bottom: 100px;
`;

export const IconBox = styled.div`
    height: 6rem;
    width: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 3rem;
    background: ${(props) =>
        props.isEat
            ? 'linear-gradient(rgba(191, 197, 198, 0.1), rgb(191, 197, 198))'
            : null};
    margin-bottom: 20px;
`;

export const Icon = styled.img`
    width: 2.5rem;
    margin-bottom: 15px;
`;
export const ButtonBox = styled.div`
    display: flex;
    padding-top: 50px;
    justify-content: space-between;
    width: 360px;
`;

export const FetchButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.isClicked ? '#8D8D8D' : '#F9F9F9')};
    border-radius: 80px;
    color: ${(props) => (props.isClicked ? 'white' : 'black')};
    height: 50px;
    width: 170px;
    border: none;
    cursor: pointer;
`;

export const SectionTitle = styled.p`
    width: 80%;
    padding: 10px 5px;
    font-size: 12px;
    font-weight: 600;
    border-bottom: 1px solid black;
    margin-top: 30px;
`;
export const NutrientBox = styled.div`
    box-sizing: border-box;
    width: 80%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const NutrientList = styled.div`
    box-sizing: border-box;
    width: 50%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;

export const Divider = styled.div`
    border-bottom: 1px solid #dcdfdf;
    width: 100%;
`;
