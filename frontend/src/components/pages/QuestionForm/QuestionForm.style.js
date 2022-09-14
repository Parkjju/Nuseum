import styled from 'styled-components';

export const Box = styled.div`
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

export const Label = styled.label`
    font-size: 15px;
    font-weight: 500;
`;

export const Description = styled.textarea`
    box-sizing: border-box;
    border: 1px solid #7f8c8d;
    height: 400px;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    resize: none;
    &:focus {
        outline: none;
    }
    margin-top: 10px;
    font-size: 12px;
`;

export const Input = styled.input`
    box-sizing: border-box;
    border: 1px solid #7f8c8d;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    &:focus {
        outline: none;
    }
    margin-top: 10px;
    font-size: 12px;
`;

export const Button = styled.button`
    width: 200px;
    height: 42px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: white;
    background-color: #7f8c8d;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
`;
