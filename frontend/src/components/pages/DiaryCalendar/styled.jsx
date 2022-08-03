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
