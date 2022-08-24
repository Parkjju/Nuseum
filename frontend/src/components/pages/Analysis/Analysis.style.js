import styled from 'styled-components';

export const Box = styled.div`
    width: 70%;
    height: 400px;
    padding-top: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    padding-bottom: 100px;
`;

export const IconBox = styled.div`
    height: 120px;
    width: 140px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const Icon = styled.img`
    width: 40px;
    margin-bottom: 15px;
`;
export const ButtonBox = styled.div`
    display: flex;
    padding-top: 50px;
    justify-content: space-between;
    width: 400px;
`;
