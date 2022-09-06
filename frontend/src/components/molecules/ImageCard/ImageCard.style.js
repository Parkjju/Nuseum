import styled from 'styled-components';

export const Container = styled.form`
    width: 70%;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
    border-radius: 10px;
    margin-bottom: 20px;
`;

export const ImageBox = styled.div`
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const SupplementImage = styled.img`
    width: 120px;
    height: 120px;
    position: relative;
    border-radius: 10px;
`;

export const DescriptionBox = styled.div`
    background-color: white;
    width: 70%;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const DescriptionInput = styled.input`
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
    width: 60%;
    border: none;
    border-bottom: 1px solid #9a9a9a;
    &:first-child {
        margin-bottom: 10px;
    }
    height: 30px;
    background-color: ${(props) => (props.disabled ? '#e0e0e0' : null)};
    border-bottom: ${(props) => (props.disabled ? '1px dotted black' : null)};
`;

export const InputBox = styled.div`
    display: flex;
`;
