import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

export const ResultBox = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Result = styled(motion.p)`
    width: 90%;
    font-size: 12px;
    text-align: left;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    line-height: 16px;
    margin-bottom: 10px;
    &:hover {
        background-color: #ecf0f1;
    }
    border-radius: 10px;
    cursor: pointer;
`;

export const Nutrition = ({ item, open }) => {
    return (
        <>
            {open
                ? Object.entries(item).map((elem, index) =>
                      elem[1] === 0 || elem[0] === 'open' ? null : (
                          <p key={index}>
                              {elem[0]} : {elem[1]}
                          </p>
                      )
                  )
                : null}
        </>
    );
};
