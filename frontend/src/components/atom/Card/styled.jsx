import styled from 'styled-components';

export const Box = styled.div`
    width: 300px;
    height: 120px;
    /* border: 1px solid rgb(0, 0, 0); */
    margin-bottom: 20px;
    /* box-shadow: 0 3px 4px rgba(0, 0, 0, 0.4); */
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    align-items: center;
    justify-items: center;
    padding: 10px;
    a {
        text-decoration: none;
    }
`;

export const Tab = styled.div`
    padding: 10px 0;
    width: 120px;
    height: 90px;
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
    width: 60px;
`;

export const Name = styled.span`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: bold;
`;
