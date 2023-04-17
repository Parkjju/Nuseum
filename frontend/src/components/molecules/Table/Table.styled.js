import styled from 'styled-components';

export const CurationMeal = styled.p`
    width: 100%;
    text-align: center;
    padding: 5px 0;
    font-size: ${(props) => `${10 + (props.numberOfCurated - 1) * 0}px`};
    color: ${(props) => (props.notCurated ? '#BABABA' : 'black')};
    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }
`;

export const CurationTd = styled.td`
    background-color: ${(props) =>
        props.children && props.children[0].props.notCurated
            ? '#F0F0F0'
            : null};
`;

// 음식, 가공식품, 보충제
export const CurationWith = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 500px;
    text-align: center;
    margin-bottom: 70px;
    ul{
        display: flex;
        width: 100%;
        font-size: 14px;
        justify-content: space-evenly;
    }
    li{
        width: 24.5%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fafafa;
        border-radius: 10px;
    }
`
