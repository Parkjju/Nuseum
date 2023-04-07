import styled from 'styled-components';

export const Box = styled.div`
    width: 84%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

export const Label = styled.label`
    font-size: 16px;
    font-weight: 500;
`;

export const Description = styled.textarea`
    box-sizing: border-box;
    border: 1px solid #7f8c8d;
    height: 400px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    resize: none;
    &:focus {
        outline: none;
    }
    margin-top: 10px;
    font-size: 15px;
`;

export const Input = styled.input`
    box-sizing: border-box;
    border: 1px solid #7f8c8d;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    &:focus {
        outline: none;
    }
    margin-top: 10px;
    font-size: 15px;
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
    background:linear-gradient(to right,#586162 0%,#8d9798 51%,#7f8c8d 100%); 
    background-size: 200% auto; 
    box-shadow: 0 0 20px #eee;
    transition: 0.5s;
    :hover{
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
`;
