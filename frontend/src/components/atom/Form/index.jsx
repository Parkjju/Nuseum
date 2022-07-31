import styled from 'styled-components';

const Input = styled.input`
    width: 300px;
    height: 42px;
    border-radius: 20px;
    border: 1px solid #6066ff;
    font-size: 16px;
    padding-left: 20px;
    margin-bottom: 15px;
    &:focus {
        outline: ${(props) => (props.error ? '1px solid red' : null)};
    }
`;

export default Input;
