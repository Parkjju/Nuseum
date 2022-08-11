import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Checkbox from '@mui/material/Checkbox';

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
    border-radius: 10px;
`;
export const Divider = styled(motion.hr)`
    width: 100%;
`;
const NutritionList = ({ item }) => {
    const [keyCount, setKeyCount] = useState(0);
    useEffect(() => {
        Object.entries(item).forEach((elem) =>
            elem[1] === 0 ||
            elem[0] === 'open' ||
            elem[0] === 'id' ||
            elem[0] === 'category' ||
            elem[0] === 'name'
                ? null
                : setKeyCount((prev) => prev + 1)
        );
    }, [item]);

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: (16 * keyCount) / 2, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
                duration: 0.5,
            }}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <div>
                {Object.entries(item).map((elem, index) =>
                    elem[1] === 0 ||
                    elem[0] === 'open' ||
                    elem[0] === 'id' ||
                    elem[0] === 'category' ||
                    elem[0] === 'name' ||
                    elem[0] === 'classifier' ? null : (
                        <p key={index}>
                            {elem[0]} : {elem[1]}
                        </p>
                    )
                )}
            </div>
            <Checkbox />
        </motion.div>
    );
};

export const Nutrition = ({ item, open }) => {
    return (
        <AnimatePresence>
            {open ? (
                <>
                    <NutritionList item={item} />
                </>
            ) : null}
        </AnimatePresence>
    );
};
