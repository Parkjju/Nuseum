import styled from 'styled-components';

export const Box = styled.div`
    margin-top: 25px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-items: space-between;
    padding: 10px;
    align-items: center;
    a {
        text-decoration: none;
    }
`;

export const Tab = styled.div`
    padding: 10px 10px;
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Icon = styled.img`
    width: 33px;
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
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: bold;
`;

export const IconName = styled(Name)`
    font-size: 11px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: bold;
    width: 100%;
    text-align: center;
`;
