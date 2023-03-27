import styled from 'styled-components';

export const CurationMeal = styled.p`
    width: 100%;
    text-align: center;
    margin-bottom: 5px;
    color: ${(props) => (props.notCurated ? 'lightgray' : 'black')};
`;

export const CurationTd = styled.td`
    ${(props) => console.log(props.isCurated)}
`;
