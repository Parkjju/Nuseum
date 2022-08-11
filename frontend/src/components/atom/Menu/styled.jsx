import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { periodState } from '../../../recoil/period/period';
import InputAdornment from '@mui/material/InputAdornment';

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
    const [isChecked, setIsChecked] = useState(false);
    const param = useParams();
    const [period, setPeriod] = useRecoilState(periodState);

    const onClick = () => {
        setIsChecked((prev) => !prev);
    };

    if (isChecked) {
        switch (param.when) {
            case 'breakfast':
                break;
            case 'lunch':
                break;
            case 'dinner':
                break;
            case 'snack':
                break;
            case 'drug':
                break;
            default:
                break;
        }
    }

    const [keyCount, setKeyCount] = useState(0);

    useEffect(() => {
        setKeyCount(0);
        Object.entries(item).forEach((elem) =>
            elem[1] === 0 ||
            elem[0] === 'open' ||
            elem[0] === 'id' ||
            elem[0] === 'category' ||
            elem[0] === 'name'
                ? null
                : setKeyCount((prev) => prev + 1)
        );
    }, []);

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 16 * keyCount, opacity: 1 }}
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

            <TextField
                size='small'
                id='outlined-start-adornment'
                sx={{
                    width: '150px',
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='start'>
                            g 또는 ml
                        </InputAdornment>
                    ),
                }}
            />
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
