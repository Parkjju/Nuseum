import styled from 'styled-components';

export const UserBox = styled.div`
    width: 80%;
    height: 60px;
    box-sizing: border-box;
    padding-left: 30px;
    display: flex;
    align-items: center;
    border-top: 1px solid #9f9f9f;
    font-size: 16px;
    font-weight: 400;
    margin: 0 auto;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
        background-color: #eeeeee;
    }
`;
