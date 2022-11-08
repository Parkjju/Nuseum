import styled from 'styled-components';

export const Box = styled.div`
    width: 80%;
    height: 50px;
`;

export const Gauge = styled.div`
    height: 50px;
    width: ${(props) =>
        props.water <= 1500
            ? (props.water / 1500) * props.maxWidth
            : props.maxWidth}px;
    background-color: #C4C4C7;
    border-radius: 20px;
`;
