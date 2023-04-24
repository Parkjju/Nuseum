import styled from 'styled-components';

export const Logo = styled.img`
    height: 200px;
`;

export const Contents = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Modal = styled.div`
    width: 90%;
    max-width: 500px;
    position: absolute;
    background: #f1f1f1;
    min-height: 630px;
    display: flex;
    z-index: 1;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    padding: 2%;
    box-shadow: rgba(149, 157, 165, 1) 0px 8px 24px;
    font-size: 14px;

    @media all and (min-width: 550px){
        min-height: 500px;
    }
    p{
        line-height: 1.5;
        white-space: pre-line;
        width: 90%;
        max-height: 85%;
        padding: 20px 2% 75px;
        margin: 0 auto;
        text-align: justify;
        span{
            text-align: center;
            display: inline-block;
            width: 100%;
        }
    }
    a{
        width:40%;
        display: inline-block;
        text-align: center;
        padding: 20px 15px;
    }
`;