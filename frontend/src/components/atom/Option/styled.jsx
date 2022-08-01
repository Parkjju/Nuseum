import styled from 'styled-components';

export const Box = styled.div`
    box-sizing: border-box;
    width: 300px;
    height: 40px;
    background-color: #1abc9c;
    border-radius: 5px;
    &:hover {
        background-color: #16a085;
        transition: 0.1s linear;
    }
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding-left: 10px;
    cursor: pointer;
`;

export const Text = styled.p`
    font-size: 16px;
    color: white;
`;

export const Index = styled.p`
    height: 20px;
    border-radius: 5px;
    width: 20px;
    font-size: 14px;
    border: 1px solid #1abc9c;
    color: #1abc9c;
    background-color: white;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
