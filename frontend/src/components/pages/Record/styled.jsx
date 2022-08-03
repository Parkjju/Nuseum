import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DiaryTitle = styled(motion.div)`
    margin-top: 50px;
    padding: 10px 0;
    width: 120px;
    height: 60px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* &:hover {
        background-color: #ecf0f1;
        transition: 0.2s linear;
    } */
`;

export const DiaryBody = styled(motion.div)`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const Label = styled.label`
    padding: 6px 25px;
    font-size: 12px;
    background-color: #7f8c8d;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
        transition: 0.1s linear;
    }
`;

export const Remove = styled.button`
    width: 30px;
    height: 30px;
    background-color: #7f8c8d;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 20px;

    &:hover {
        background-color: #bdc3c7;
        transition: 0.1s linear;
    }
`;

export const ImageBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-bottom: 50px;
`;

export const ModalBackground = styled.div`
    width: 100vw;
    height: 110vh;
    position: absolute;
    display: flex;
    justify-content: center;
    padding-top: 100px;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalSearch = styled.div`
    width: 90%;
    padding-right: 10px;
    height: 30px;
    padding-left: 10px;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 16px;
`;

export const ModalInput = styled.input`
    border: none;
    &:focus {
        border: none;
        outline: none;
    }
    line-height: 16px;
    width: 100%;
    font-size: 16px;
`;

export const Img = styled.img`
    max-width: '100%';
    max-height: 180;
    border-radius: 20px;
    box-shadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px';
    cursor: 'pointer';
`;

export const TagBox = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
`;

export const Tag = styled.div`
    border-radius: 8px;
    font-size: 14px;
    padding: 8px;
    background-color: #7f8c8d;
    color: white;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: default;
`;