import styled from 'styled-components';

export const VerticalImageBox = styled.div`
    height: auto;
    width: 80%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;
export const ImageBox = styled.div`
    width: 90%;
    margin-right: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const DataBox = styled.div`
    width: 80%;
    height: auto;
    background-color: black;
`;

export const Summary = styled.div`
    width: 80%;
    height: auto;
    background-color: #eeeeee;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding-top: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const SummaryTitle = styled.p`
    width: 100%;
    text-align: center;
    font-size: 14px;
`;