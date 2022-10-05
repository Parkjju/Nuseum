import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DiaryTitle = styled(motion.div)`
    padding: 10px 0;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* &:hover {
        background-color: #ecf0f1;
        transition: 0.2s linear;
    } */
    span{
        font-size:16px;
    }
`;
