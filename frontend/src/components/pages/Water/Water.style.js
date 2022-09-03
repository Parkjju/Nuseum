import styled from 'styled-components';

export const Box = styled.div`
    width: 80%;
    height: 50px;
`;

export const Gauge = styled.div`
    height: 50px;
    width: ${(props) =>
        props.water <= 2000
            ? (props.water / 2000) * props.maxWidth
            : props.maxWidth}px;
    background-color: #7f8c8d;
    border-radius: 20px;
`;
