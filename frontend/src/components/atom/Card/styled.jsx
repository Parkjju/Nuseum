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
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Icon = styled.img`
    width: 30px;
    margin-bottom: 5px;
`;
export const IconBox = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Name = styled.span`
    font-size: 14px;
    color: #222222;
    font-weight: 600;
    text-align: center;
    white-space: pre-wrap;
`;

export const IconName = styled(Name)`
    font-size: 14px;
    color: #222222;
    font-weight: 600;
    width: 100%;
    text-align: center;
    white-space: pre-wrap;
`;
