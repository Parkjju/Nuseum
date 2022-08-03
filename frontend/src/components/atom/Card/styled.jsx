import styled from 'styled-components';

export const Box = styled.div`
    margin-top: 40px;
    width: 300px;
    height: 300px;
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    justify-items: center;

    padding: 10px;
    a {
        text-decoration: none;
    }
`;

export const Tab = styled.div`
    padding: 10px 0;
    width: 80px;
    height: 60px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    &:hover {
        background-color: #ecf0f1;
        transition: 0.2s linear;
    }
`;

export const Icon = styled.img`
    width: 40px;
`;

export const Name = styled.span`
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: bold;
`;
