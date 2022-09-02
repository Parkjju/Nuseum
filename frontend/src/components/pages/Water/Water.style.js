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
    background: linear-gradient(#08c8f6, #4d5dfb);
    border-radius: 10px;
`;
