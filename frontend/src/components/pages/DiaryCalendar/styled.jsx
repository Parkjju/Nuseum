import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DiaryTitle = styled(motion.div)`
    width: 90%;
    margin-bottom: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* &:hover {
        background-color: #ecf0f1;
        transition: 0.2s linear;
    } */
    span{
        font-size:20px;
    }
`;
