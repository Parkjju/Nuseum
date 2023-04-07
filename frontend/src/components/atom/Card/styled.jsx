import styled from 'styled-components';

export const Box = styled.div`
    margin: 30px 0;
    max-width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-items: space-between;
    justify-content: center;
    align-items: center;
    a {
        text-decoration: none;
    }
`;

export const Tab = styled.div`
    padding: 10px;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Icon = styled.img`
    width: 38px;
    margin-bottom: 10px;
`;
export const IconBox = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Name = styled.span`
    font-size: 16px;
    color: #222222;
    font-weight: bold;
    text-align: center;
    white-space: pre-wrap;
`;

export const IconName = styled(Name)`
    font-size: 16px;
    color: #222222;
    font-weight: bold;
    width: 100%;
    text-align: center;
    white-space: pre-wrap;
`;
