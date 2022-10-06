import styled from 'styled-components';

export const Modal = styled.div`
    border: 1px solid black;
    width: 300px;
    max-height: 120px;
    position: relative;
    top: 100px;
    background-color: white;
    border-radius: 25px;
    padding: 30px 25px;
`;

export const ModalTitle = styled.p`
    font-size: 16px;
    font-weight: bold;
    height: 15px;
    margin-bottom: 20px;
`;

export const SearchTitle = styled(ModalTitle)`
    font-size: 12px;
    font-family: 'Noto Serif KR', serif;
    font-weight: 400;
    line-height: 1.5;
    text-align: justify;
    white-space: default;
    height: auto;
`;

export const ModalDescription = styled.p`
    font-size: 16px;
    width: 80%;
    height: 20px;
    margin-bottom: 30px;
`;
export const ModalBtn = styled.button`
    height: 40px;
    width: 100%;
    border-radius: 10px;
    color: black;
    border: none;
    background-color: white;
`;

export const Container = styled.div`
    width: 100vw;
    position: absolute;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    display: flex;
    justify-content: center;
    z-index: 1;
`;
