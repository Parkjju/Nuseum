import styled from 'styled-components';

export const Modal = styled.div`
    border: 1px solid black;
    width: 300px;
    height: 160px;
    position: relative;
    top: 100px;
    background-color: white;
    border-radius: 25px;
    padding: 15px 25px;
`;

export const ModalTitle = styled.p`
    font-size: 18px;
    font-weight: bold;
    height: 15px;
    margin-bottom: 20px;
`;

export const ModalDescription = styled.p`
    font-size: 15px;
    width: 80%;
    height: 20px;
    margin-bottom: 30px;
`;
export const ModalBtn = styled.button`
    height: 40px;
    width: 100%;
    border-radius: 10px;
    background-color: #f1c40f;
    color: white;
    border: none;
    &:active {
        opacity: 0.9;
    }
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
