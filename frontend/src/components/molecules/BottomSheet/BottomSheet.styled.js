import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    z-index: 1;
`;

export const Modal = styled(motion.div)`
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #f7f7f7;
    box-shadow: 0px -2px 7px rgba(0, 0, 0, 0.2);
    border-radius: 30px 30px 0px 0px;
    padding: 40px 20px;
    max-width: 600px;
`;

export const TagName = styled.p`
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 40px;
`;

export const URLBox = styled.div`
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #dddddd;
    border-radius: 16px;
    padding: 12px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

export const URLName = styled.span`
    font-size: 14px;
`;
export const URL = styled.a`
    font-size: 11px;
    line-height: 16px;
    color: #838383;
    cursor: pointer;
    text-decoration: underline;
`;
