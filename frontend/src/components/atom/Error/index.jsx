import styled from 'styled-components';

const Error = styled.span`
    font-size: 14px;
    margin-bottom: 15px;
    display: flex;
    width: 300px;
    justify-content: flex-start;
    background-color: black;
    color: white;
    padding: 5px;
    border-radius: 10px;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 30px;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-bottom-color: black;
        border-top: 0;
        border-left: 0;
        margin-left: -10px;
        margin-top: -10px;
    }
`;

export default Error;
