import styled from 'styled-components';

export const CurationMeal = styled.p`
    width: 100%;
    text-align: center;
    padding: 8px 0;
    font-size: ${(props) => `${14 + (props.numberOfCurated - 1) * 0.5}px`};
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
